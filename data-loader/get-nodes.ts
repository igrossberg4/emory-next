import * as fs from 'fs';
import * as path from 'path';

function loadFilesAndParse(basePath: string, files: Array<string>) {
    return files.map(file => fs.readFileSync(path.join(basePath, file)))
        .map(fileLoaded => JSON.parse(fileLoaded.toString())).flat()
}

function findSlides(pages: Array<any>, nodes: Array<any>, actual: any) {
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
            }
        }
    })
}

function prepareMenu(nodes:Array<any>) {
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
                component: "MenuTop",
                props: {
                  title: "Schools and units",
                  type:"schools-units",
                  options_schools: schoolMenu[0].schools.map(value=> {
                    const nodeFind = nodes.find(node => value.id ===node.id)
                    return  {
                        title: value.title ? value.title : nodeFind.page_props.title
                    }
                }),
                  options_units: schoolMenu[0].units.map(value=> {
                    const nodeFind = nodes.find(node => value.id ===node.id)
                    return  {
                        title: value.title ? value.title : nodeFind.page_props.title,
                        link_to: nodeFind.path
                    }
                }),
                },
              },
              {
                component: "MenuTop",
                props: {
                  title: "Menu",
                  options: mainMenu.flat().map(value=> {
                      const nodeFind = nodes.find(node => value.id ===node.id)
                      return  {
                          title: value.title ? value.title : nodeFind.page_props.title,
                          link_to: nodeFind.path

                      }
                  }),
                },
              }
          ]
        }
    }   
}

function generatePageWithComponents(pages: Array<any>, nodes: Array<any>, menus:any) {
    return pages.map((page, i) => {
        const nodeFinded = nodes.find(node => page === node.id);
        const prevPath = i === 0 ? null : nodes.find(node => node.id === pages[i - 1]).path;
        const nextPath = i === pages.length - 1 ? null : nodes.find(node => node.id === pages[i + 1]).path;
        return {
            path: nodeFinded.path,
            meta: Object.assign({}, nodeFinded.metatag),
            view: [
                menus,
                {
                    component: "CarouselNavigation",
                    props: {
                        prev: prevPath,
                        actual: {
                            component: "DynamicComponentMatcher",
                            props: {
                                view: [
                                    {
                                        component: "CarouselItem",
                                        props: nodeFinded.page_props
                                    }

                                ].concat(nodeFinded.components)
                            }
                        },
                        next: nextPath,
                        slides: findSlides(pages, nodes, nodeFinded)
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