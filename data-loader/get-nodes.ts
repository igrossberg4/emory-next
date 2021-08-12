import * as fs from 'fs';
import * as path from 'path';

function loadFilesAndParse(basePath: string, files: Array<string>) {
    return files.map(file => fs.readFileSync(path.join(basePath, file)))
        .map(fileLoaded => JSON.parse(fileLoaded.toString())).flat()
}

function findSlides(pages: Array<any>, nodes: Array<any>, actual: any, lastNode: any, nextNode: any, nodeBase:any) {
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
                        prepareBottomMenu(lastNode, nextNode, nodes, nodeBase)
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
                        title: "Select school",
                        options_schools: schoolMenu[0].schools.map((value:any) => {
                            const nodeFind = nodes.find(node => value.id === node.id)
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: '/' + nodeFind.path
                            }
                        }),
                        options_units: schoolMenu[0].units.map((value:any) => {
                            const nodeFind = nodes.find(node => value.id === node.id)
                            return {
                                title: value.title ? value.title : nodeFind.page_props.title,
                                link_to: '/' + nodeFind.path
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
                                link_to: '/' + nodeFind.path,
                            }
                        }),
                        social: mainMenu[0].social
                    },
                }
            ]
        }
    }
}

function prepareBottomMenu(lastNode: any, nextNode: any, nodes: Array<any>, baseNode:any) {
    const basePath = baseNode ? `${baseNode.path}/` : '';
    const prevNodeSelect = !lastNode ? nodes[nodes.length-1] : lastNode;
    const nextNodeSelect = !nextNode ? nodes[0] : nextNode;
    const previous_route = prevNodeSelect.id === baseNode.id ? `${baseNode.path}` : `${baseNode.path}/${prevNodeSelect.path}`;
    const next_route = nextNodeSelect.id === baseNode.id ? `${baseNode.path}` : `${baseNode.path}/${nextNodeSelect.path}`;
    return {
        "component": "BottomNavigation",
        "props": {
            "previous_title": prevNodeSelect?.page_props.header,
            "next_title": nextNodeSelect?.page_props?.header,
            "previous_route": '/'+ previous_route,
            "next_route": '/' + next_route
        }
    }
}

function generatePageWithComponents(pages_list: {list:Array<string>, nodeBase:any}, nodes: Array<any>, menus: any) {
    const pages = pages_list.list;
    const nodesForCollection = pages.map(page => nodes.find(node=> node.id === page));
    return pages.map((page, i) => {
        const nodeFinded = nodes.find(node => page === node.id);
        const prevNode = i === 0 ? null : nodes.find(node => node.id === pages[i - 1]);
        const nextNode = i === pages.length - 1 ? null : nodes.find(node => node.id === pages[i + 1]);
        console.log("NODE BASE 1", pages_list.nodeBase)
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
                                        props: nodeFinded.page_props
                                    }

                                ].concat(nodeFinded.components).concat(
                                    prepareBottomMenu(prevNode, nextNode, nodesForCollection, pages_list.nodeBase)
                                    )
                            }
                        },
                        next: !nextNode ? null : (nextNode.id !== pages_list.nodeBase.id ? `${pages_list.nodeBase.path}/${nextNode.path}` : pages_list.nodeBase.path),
                        slides: findSlides(pages, nodesForCollection, nodeFinded, prevNode, nextNode, pages_list.nodeBase)
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
    const menus = prepareMenu(nodes);
    const pages = nodes.map(node => ({list:node.list, nodeBase:node})).filter(value=> value.list !== undefined);
    return { paths: pages.map(pages_list=> generatePageWithComponents(pages_list, nodes, menus)).flat() };
}