import * as fs from 'fs';
import * as path from 'path';

function loadFilesAndParse(basePath: string, files: Array<string>) {
    return files.map(file => fs.readFileSync(path.join(basePath, file)))
        .map(fileLoaded => JSON.parse(fileLoaded.toString())).flat()
}

function findSlides(pages: Array<any>, nodes: Array<any>, actual: any, lastNode: any, nextNode: any) {
    return pages.map(page => {
        const nodeFinded = nodes.find(node => page === node.id)
        return actual.id !== nodeFinded.id ? {
            component: "DynamicComponentMatcher",
            props: {
                view: [
                    {
                        component: "CarouselItem",
                        props: nodeFinded.page_props
                    }

                ]
            }
        } : {
            component: "DynamicComponentMatcher",
            props: {
                view: [
                    {
                        component: "CarouselItem",
                        props: nodeFinded.page_props
                    }

                ].concat(nodeFinded.components)
                    .concat(
                        prepareBottomMenu(lastNode, nextNode, nodes)
                    )
            }
        }
    })
}

function prepareMenu(nodes: Array<any>) {
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
                        title: "Schools and units",
                        options_schools: schoolMenu[0].schools.map((value:any) => {
                            const nodeFind = nodes.find(node => value.id === node.id)
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: nodeFind.path
                            }
                        }),
                        options_units: schoolMenu[0].units.map((value:any) => {
                            const nodeFind = nodes.find(node => value.id === node.id)
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: nodeFind.path
                            }
                        }),
                    },
                },
                {
                    component: "MainMenu",
                    props: {
                        title: "Menu",
                        options: mainMenu[0].links.map(link => {
                            const nodeFind = nodes.find(node =>  link.id  === node.id)
                            return {
                                title: link.title ? link.title : nodeFind.page_props.title,
                                link_to: nodeFind.path,
                            }
                        }),
                        social: mainMenu[0].social
                    },
                }
            ]
        }
    }
}

function prepareBottomMenu(lastNode: any, nextNode: any, nodes: Array<any>) {
    return {
        "component": "BottomNavigation",
        "props": {
            "previous_title": lastNode ? lastNode?.page_props?.header : nodes[0]?.page_props?.header,
            "next_title": nextNode ? nextNode?.page_props?.header : nodes[0]?.page_props?.header,
            "previous_route": lastNode ? lastNode.path : nodes[0].path,
            "next_route": nextNode ? nextNode.path : nodes[0].path
        }
    }
}

function generatePageWithComponents(pages: Array<any>, nodes: Array<any>, menus: any) {
    return pages.map((page, i) => {
        const nodeFinded = nodes.find(node => page === node.id);
        const prevNode = i === 0 ? null : nodes.find(node => node.id === pages[i - 1]);
        const nextNode = i === pages.length - 1 ? null : nodes.find(node => node.id === pages[i + 1]);
        return {
            path: nodeFinded.path,
            meta: Object.assign({}, nodeFinded.metatag),
            view: [
                menus,
                {
                    component: "CarouselNavigation",
                    props: {
                        prev: prevNode ? prevNode.path : null,
                        actual: {
                            component: "DynamicComponentMatcher",
                            props: {
                                view: [
                                    {
                                        component: "CarouselItem",
                                        props: nodeFinded.page_props
                                    }

                                ].concat(nodeFinded.components).concat(prepareBottomMenu(prevNode, nextNode, nodes))
                            }
                        },
                        next: nextNode ? nextNode.path : null,
                        slides: findSlides(pages, nodes, nodeFinded, prevNode, nextNode)
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
    const pages = loadFilesAndParse('./data/list', fs.readdirSync(path.join('./data/list'))
        .filter(value => value.endsWith('.json')));
    //console.log(JSON.stringify(generatePageWithComponents(pages, nodes)));
    const menus = prepareMenu(nodes);
    return { paths: generatePageWithComponents(pages, nodes, menus) };
}