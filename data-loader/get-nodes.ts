import * as fs from 'fs';
import * as path from 'path';

function loadFilesAndParse(basePath: string, files: Array<string>) {
    return files.map(file => fs.readFileSync(path.join(basePath, file)))
        .map(fileLoaded => JSON.parse(fileLoaded.toString())).flat()
}

function findSlides(pages: Array<any>, nodes: Array<any>, actual: any, lastNode: any, nextNode: any, nodeBase: any) {
    return pages.map(page => {
        const nodeFinded = nodes.find(node => page === node.id);
        const path = nodeFinded.id === nodeBase.id ? `${nodeFinded.path == '' ? '/' : nodeBase.path}` : `${nodeBase.path}/${nodeFinded.path}`;
        return actual.id !== nodeFinded.id ? {
            component: "DynamicComponentMatcher",
            props: {
                view: [
                    {
                        component: "CarouselItem",
                        props: Object.assign(nodeFinded.page_props, {
                            path: path
                        })
                    }

                ]
            }
        } : {
            component: "DynamicComponentMatcher",
            props: {
                view: [
                    {
                        component: "CarouselItem",
                        props: Object.assign({ ...nodeFinded.page_props }, { active: true })
                    }

                ].concat(nodeFinded.components)
                    .concat(
                        prepareBottomMenu(lastNode, nextNode, nodes, nodeBase)
                    )
            }
        }
    })
}

function prepareMenu(nodes: Array<any>, baseNode: any) {
    const mainMenu = loadFilesAndParse('./data/menu', fs.readdirSync(path.join('./data/menu'))
        .filter(value => value.startsWith('main'))
        .filter(value => value.endsWith('.json')))
        ;
    const schoolMenu = loadFilesAndParse('./data/menu', fs.readdirSync(path.join('./data/menu'))
        .filter(value => value.startsWith('school'))
        .filter(value => value.endsWith('.json')))
        ;
    return {
        component: "DynamicComponentMatcher",
        props: {
            view: [
                {
                    component: "SchoolsMenu",
                    props: {
                        title: "Select school",
                        options_schools: schoolMenu[0].schools.map((value: any) => {
                            const nodeFind = nodes.find(node => value.id === node.id);
                            const link = baseNode.id === nodeFind.id ? `${baseNode.path}` : `${baseNode.path}/${nodeFind.path}`
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: '/' + link
                            }
                        }),
                        options_units: schoolMenu[0].units.map((value: any) => {
                            const nodeFind = nodes.find(node => value.id === node.id);
                            const link = baseNode.id === nodeFind.id ? `${baseNode.path}` : `${baseNode.path}/${nodeFind.path}`
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: '/' + link
                            }
                        }),
                    },
                },
                {
                    component: "MainMenu",
                    props: {
                        title: "Menu",
                        options: mainMenu[0].links.map((link: any) => {
                            const nodeFind = nodes.find(node => link.id === node.id)
                            const linkFound = baseNode.id === nodeFind.id ? `${baseNode.path}` : `${baseNode.path}/${nodeFind.path}`

                            return {
                                title: link.title ? link.title : nodeFind.page_props.title,
                                link_to: '/' + linkFound
                            }
                        }),
                        social: mainMenu[0].social
                    },
                }
            ]
        }
    }
}

function prepareBottomMenu(lastNode: any, nextNode: any, nodes: Array<any>, baseNode: any) {
    const basePath = baseNode ? `${baseNode.path}/` : '';
    const prevNodeSelect = !lastNode ? nodes[nodes.length - 1] : lastNode;
    const nextNodeSelect = !nextNode ? nodes[0] : nextNode;
    const previous_route = prevNodeSelect.id === baseNode.id ? `${baseNode.path}` : `${baseNode.path}/${prevNodeSelect.path}`;
    const next_route = nextNodeSelect.id === baseNode.id ? `${baseNode.path}` : `${baseNode.path}/${nextNodeSelect.path}`;
    return [
        {
            "component": "BottomNavigation",
            "props": {
                "previous_title": prevNodeSelect?.page_props.header,
                "next_title": nextNodeSelect?.page_props?.header,
                "previous_route": '/' + previous_route,
                "next_route": '/' + next_route
            }
        },
        {
            "component": "Footer",
            "props": {}
        }
    ]
}

function generatePageWithComponents(pages_list: { list: Array<string>, nodeBase: any }, nodes: Array<any>) {
    const pages = pages_list.list;
    const nodesForCollection = pages.map(page => nodes.find(node => node.id === page));
    return pages.map((page, i) => {
        const nodeFinded = nodes.find(node => page === node.id);
        const prevNode = i === 0 ? nodes.find(node => node.id === pages[pages.length - 1]) : nodes.find(node => node.id === pages[i - 1]);
        const nextNode = i === pages.length - 1 ? nodes.find(node => node.id === pages[0]) : nodes.find(node => node.id === pages[i + 1]);
        const menus = prepareMenu(nodesForCollection, pages_list.nodeBase);
        const slides = findSlides(pages, nodesForCollection, nodeFinded, prevNode, nextNode, pages_list.nodeBase);
        nodeFinded.components.forEach((component: any) => {
            if (component.component === 'AccordionComponent') {
                const re = new RegExp("^(http|https)://", "i");

                component.props.items.forEach((item: any) => {
                    if (item.read_more && !re.test(item.read_more)) {
                        const nodeAccordionLink = nodes.find(node => pages.findIndex(page => page === item.read_more && node.id === page) > -1);
                        const path = nodeAccordionLink.id === pages_list.nodeBase.id ? `${pages_list.nodeBase.path}` : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                        item.read_more = path;
                        item.internal_link = true;
                    }
                })
            }
            if (component.component === 'CampaignCarousel') {
                const re = new RegExp("^(http|https)://", "i");
                component.props.slides.forEach((slide: any) => {
                    const item = slide.props;
                    if (item.explore_link && !re.test(item.explore_link)) {
                        const nodeAccordionLink = nodes.find(node => pages.findIndex(page => page === item.explore_link && node.id === page) > -1);
                        const path = nodeAccordionLink.id === pages_list.nodeBase.id ? `${pages_list.nodeBase.path}` : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                        item.explore_link = path;
                        item.internal_link = true;
                    }
                })
            }
        });
        if (i === 0 || i === pages.length - 1) {
            if (i === 0) {
                slides.unshift({
                    component: "DynamicComponentMatcher",
                    props: {
                        view: [
                            {
                                component: "CarouselItem",
                                props: prevNode.page_props
                            }

                        ]
                    }
                });
                if (pages.length > 2) {
                    const previousNodeCloned = nodes.find(node => node.id === pages[pages.length - 2]);
                    slides.unshift({
                        component: "DynamicComponentMatcher",
                        props: {
                            view: [
                                {
                                    component: "CarouselItem",
                                    props: previousNodeCloned.page_props
                                }

                            ]
                        }
                    });
                }

            } else {
                slides.push({
                    component: "DynamicComponentMatcher",
                    props: {
                        view: [
                            {
                                component: "CarouselItem",
                                props: nextNode.page_props
                            }

                        ]
                    }
                });
                if (pages.length > 2) {
                    const nextNodeCloned = nodes.find(node => node.id === pages[0 + 1]);
                    slides.push({
                        component: "DynamicComponentMatcher",
                        props: {
                            view: [
                                {
                                    component: "CarouselItem",
                                    props: nextNodeCloned.page_props
                                }

                            ]
                        }
                    });
                }
            }
        }

        return {
            path: pages_list.nodeBase.id === nodeFinded.id ? `${nodeFinded.path}` : `${pages_list.nodeBase.path}/${nodeFinded.path}`,
            meta: Object.assign({}, nodeFinded.metatag),
            view: [
                menus,
                {
                    component: "CarouselNavigation",
                    props: {
                        prev: !prevNode ? null : (prevNode.id !== pages_list.nodeBase.id ? `${pages_list.nodeBase.path}/${prevNode.path}` : pages_list.nodeBase.path),
                        actual: {
                            component: "DynamicComponentMatcher",
                            props: {
                                view: [
                                    {
                                        component: "CarouselItem",
                                        // We assign the active prop for scale only this element.
                                        props: Object.assign({ ...nodeFinded.page_props }, { active: true })
                                    }

                                ].concat(nodeFinded.components).concat(
                                    prepareBottomMenu(prevNode, nextNode, nodesForCollection, pages_list.nodeBase)
                                )
                            }
                        },
                        next: !nextNode ? null : (nextNode.id !== pages_list.nodeBase.id ? `${pages_list.nodeBase.path}/${nextNode.path}` : pages_list.nodeBase.path),
                        slides: slides
                    }
                }
            ]
        }
    }).filter(Boolean);

}

export function getNodes() {
    const nodes = loadFilesAndParse('./data/nodes', fs.readdirSync(path.join('./data/nodes'))
        .filter(value => value.endsWith('.json')))
        ;
    //console.log(JSON.stringify(generatePageWithComponents(pages, nodes)));
    const pages = nodes.map(node => ({ list: node.list, nodeBase: node })).filter(value => value.list !== undefined);
    return { paths: pages.map(pages_list => generatePageWithComponents(pages_list, nodes)).flat() };
}