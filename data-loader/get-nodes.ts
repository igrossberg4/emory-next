import * as fs from "fs";
import * as path from "path";

function loadFilesAndParse(basePath: string, files: Array<string>) {
  return files
    .map((file) => fs.readFileSync(path.join(basePath, file)))
    .map((fileLoaded) => JSON.parse(fileLoaded.toString()))
    .flat();
}

async function getData(url: string) {
  let obj = (await fetch(url)).json();
  return obj;
}

function findSlides(
  pages: Array<any>,
  nodes: Array<any>,
  actual: any,
  lastNode: any,
  nextNode: any,
  nodeBase: any,
  index: number
) {
  const slides = pages.map((page) => {
    let nodeFinded;
    try {
      nodeFinded = nodes.find((node) => page === node.id);
    } catch (e) {
      throw (
        "Slide with id " +
        page +
        ` from base collection '${nodeBase.id}' ` +
        " not found in pages"
      );
    }
    const path =
      nodeFinded.id === nodeBase.id
        ? `${nodeFinded.path == "" ? "/" : nodeFinded.path}`
        : `${nodeBase.path}/${nodeFinded.path}`;
    return actual.id !== nodeFinded.id
      ? {
          component: "DynamicComponentMatcher",
          props: {
            view: [
              nodeBase.id === nodeFinded.id
                ? {
                    component: "IntroPage",
                    props: Object.assign(
                      {
                        isMain: true,
                        active: false,
                        path: path,
                      },
                      nodeFinded.page_props
                    ),
                  }
                : {
                    component: "CarouselItem",
                    props: Object.assign(
                      nodeFinded.page_props,
                      {
                        path: path,
                      },
                      nodeFinded.page_props
                    ),
                  },
            ],
          },
        }
      : {
          component: "DynamicComponentMatcher",
          props: {
            view: [
              nodeBase.id === nodeFinded.id
                ? {
                    component: "IntroPage",
                    props: Object.assign(
                      {
                        isMain: true,
                        active: true,
                        path: path,
                      },
                      nodeFinded.page_props
                    ),
                  }
                : {
                    component: "CarouselItem",
                    // We assign the active prop for scale only this element.
                    props: Object.assign(
                      { ...nodeFinded.page_props },
                      { active: true }
                    ),
                  },
            ]
              .concat(nodeFinded.components)
              .concat(
                prepareBottomMenu(
                  lastNode,
                  nextNode,
                  nodes,
                  nodeBase,
                  nodeFinded
                )
              ),
          },
        };
  });
  const slidesCloned: any = [];
  for (let i = Math.round(slides.length / 2); i < slides.length; i++) {
    if (i + index > slides.length - 1) {
      slidesCloned.push(slides[index + i - slides.length]);
    } else {
      slidesCloned.push(slides[index + i]);
    }
  }
  slidesCloned.push(slides[index]);
  for (let i = 1; i < Math.round(slides.length / 2); i++) {
    if (i + index > slides.length - 1) {
      slidesCloned.push(slides[index + i - slides.length]);
    } else {
      slidesCloned.push(slides[index + i]);
    }
  }
  //slidesCloned.push(...slidesCloned.slice(0, 2));
  //slidesCloned.unshift(...slidesCloned.slice(slidesCloned.length-2, slidesCloned.length-1))

  return slidesCloned;
}

function prepareMenu(nodes: Array<any>, baseNode: any, allNodes: Array<any>) {
  const mainMenu = loadFilesAndParse(
    "./data/menu",
    fs
      .readdirSync(path.join("./data/menu"))
      .filter((value) => value.startsWith("main-menu-v2"))
      .filter((value) => value.endsWith(".json"))
  );
  const schoolMenu = loadFilesAndParse(
    "./data/menu",
    fs
      .readdirSync(path.join("./data/menu"))
      .filter((value) => value.startsWith("school"))
      .filter((value) => value.endsWith(".json"))
  );
  const optionsSchoolsMenu = schoolMenu[0].schools.map((value: any) => {
    let link;
    try {
      const nodeFind = nodes.find((node) => value.id === node.id);
      link =
        baseNode.id === nodeFind.id
          ? `${baseNode.path}`
          : `${baseNode.path}/${nodeFind.path}`;
      return {
        title: value.title ? value.title : nodeFind.page_props.title,
        link_to: link,
      };
    } catch (e) {
      throw (
        "Link page with id " +
        value?.id +
        " at menu school not found in pages with base collection " +
        baseNode.id
      );
    }
  });
  const optionsMenuUnits = schoolMenu[0].units.map((value: any) => {
    const nodeFind = nodes.find((node) => value.id === node.id);
    const link =
      baseNode.id === nodeFind.id
        ? `${baseNode.path}`
        : `${baseNode.path}/${nodeFind.path}`;
    return {
      title: value.title ? value.title : nodeFind.page_props.title,
      link_to: link,
    };
  });

  const optionsCampaignsMenu = mainMenu[0].campaigns.map((link: any) => {
    try {
      const nodeArraySelect = link.standalone ? allNodes : nodes;
      const nodeFind = nodeArraySelect.find((node) => link.id === node.id);
      const linkFound =
        baseNode.id === nodeFind.id
          ? `${baseNode.path}`
          : `${baseNode.path}/${nodeFind.path}`;
      return {
        title: link.title ? link.title : nodeFind.page_props.title,
        link_to: linkFound,
        new: link.new ?? false,
      };
    } catch (e) {
      throw (
        "Link page with id " +
        link.id +
        " at menu not found in pages with base collection " +
        baseNode.id
      );
    }
  });

  // console.log(mainMenu[0]);

  const optionsExploresMenu = mainMenu[0].explore_mores.map((link: any) => {
    try {
      const nodeArraySelect = link.standalone ? allNodes : nodes;
      const nodeFind = nodeArraySelect.find((node) => link.id === node.id);
      const linkFound =
        baseNode.id === nodeFind.id
          ? `${baseNode.path}`
          : `${baseNode.path}/${nodeFind.path}`;
      return {
        title: link.title ? link.title : nodeFind.page_props.title,
        link_to: linkFound,
        new: link.new ?? false,
      };
    } catch (e) {
      throw (
        "Link page with id " +
        link.id +
        " at menu not found in pages with base collection " +
        baseNode.id
      );
    }
  });

  // const optionsMenu = mainMenu[0].links.map((link: any) => {
  //   try {
  //     const nodeArraySelect = link.standalone ? allNodes : nodes;
  //     const nodeFind = nodeArraySelect.find((node) => link.id === node.id);
  //     const linkFound =
  //       baseNode.id === nodeFind.id
  //         ? `${baseNode.path}`
  //         : `${baseNode.path}/${nodeFind.path}`;

  //     return {
  //       title: link.title ? link.title : nodeFind.page_props.title,
  //       link_to: linkFound,
  //       new: link.new ?? false,
  //     };
  //   } catch (e) {
  //     throw (
  //       "Link page with id " +
  //       link.id +
  //       " at menu not found in pages with base collection " +
  //       baseNode.id
  //     );
  //   }
  // });

  return {
    component: "DynamicComponentMatcher",
    props: {
      view: [
        {
          component: "Header",
          props: {
            menu_school: {
              title: "Select school",
              options_schools: optionsSchoolsMenu,
              options_units: optionsMenuUnits,
            },
            main_menu: {
              title: "Menu",
              options_campaigns: optionsCampaignsMenu,
              options_explores: optionsExploresMenu,
              social: mainMenu[0].social,
            },
          },
        },
      ],
    },
  };
}

function prepareBottomMenu(
  lastNode: any,
  nextNode: any,
  nodes: Array<any>,
  baseNode: any,
  nodeFinded: any
) {
  const basePath = baseNode ? `${baseNode.path}/` : "";
  const prevNodeSelect = !lastNode ? nodes[nodes.length - 1] : lastNode;
  const nextNodeSelect = !nextNode ? nodes[0] : nextNode;
  const previous_route =
    prevNodeSelect.id === baseNode.id
      ? `${baseNode.path}`
      : `${
          baseNode.path === ""
            ? prevNodeSelect.path
            : baseNode.path + "/" + prevNodeSelect.path
        }`;
  const next_route =
    nextNodeSelect.id === baseNode.id
      ? `${baseNode.path}`
      : `${
          baseNode.path === ""
            ? nextNodeSelect.path
            : baseNode.path + "/" + nextNodeSelect.path
        }`;
  return [
    {
      component: "BottomNavigation",
      props: {
        previous_title: prevNodeSelect?.page_props.header,
        next_title: nextNodeSelect?.page_props?.header,
        previous_route: previous_route,
        next_route: next_route,
      },
    },
    {
      component: "Footer",
      props: Object.assign({}, nodeFinded.page_props.footer),
    },
  ];
}

function generatePagesWithoutParent(
  nodes: Array<any>,
  baseNode: any,
  allIndependentNodes: Array<any>
) {
  const menus = prepareMenu(nodes, baseNode, nodes);
  return allIndependentNodes
    .map((node) => {
      // Fallback to page text if description not provided.
      let metatags = node.metatag;
      if (
        metatags.description.trim() == "" &&
        node.page_props.hasOwnProperty("text")
      ) {
        metatags.description = node.page_props.text;
      }
      if (
        typeof node.page_props.custom_css !== "undefined" &&
        node.page_props.custom_css !== ""
      ) {
        // Let custom CSS be defined
        metatags.custom_css = node.page_props.custom_css;
      }
      return {
        path: node.path,
        meta: Object.assign({}, metatags),
        view: [
          menus,
          {
            component: "CarouselItem",
            // We assign the active prop for scale only this element.
            props: Object.assign({ ...node.page_props }, { active: true }),
          },
        ]
          .concat(node.components)
          .concat({
            component: "Footer",
            props: Object.assign({}, node.page_props.footer),
          }),
      };
    })
    .filter(Boolean);
}

function generatePageWithComponents(
  pages_list: { list: Array<string>; nodeBase: any },
  nodes: Array<any>
) {
  const pages = pages_list.list;
  const nodesForCollection = pages.map((page) =>
    nodes.find((node) => node.id === page)
  );
  const independentNodes = nodes.filter(
    (nodeIndependents) =>
      pages_list.list.findIndex((list) => list === nodeIndependents.id) === -1
  );
  const independentNodesComponents = generatePagesWithoutParent(
    nodes,
    pages_list.nodeBase,
    independentNodes
  );
  return pages
    .map((page, i) => {
      let nodeFinded;
      try {
        nodeFinded = nodes.find((node) => page === node.id);
      } catch (e) {
        console.log("Node with id " + page + " not found in pages");
      }
      const prevNode =
        i === 0
          ? nodes.find((node) => node.id === pages[pages.length - 1])
          : nodes.find((node) => node.id === pages[i - 1]);
      const nextNode =
        i === pages.length - 1
          ? nodes.find((node) => node.id === pages[0])
          : nodes.find((node) => node.id === pages[i + 1]);
      const menus = prepareMenu(
        nodesForCollection,
        pages_list.nodeBase,
        independentNodes
      );
      const slides = findSlides(
        pages,
        nodesForCollection,
        nodeFinded,
        prevNode,
        nextNode,
        pages_list.nodeBase,
        i
      );
      nodeFinded.components.forEach((component: any) => {
        if (component.component === "AccordionComponent") {
          const re = new RegExp("^(http|https)://", "i");

          component.props.items.forEach((item: any) => {
            if (item.read_more && !re.test(item.read_more)) {
              const nodeAccordionLink = nodes.find(
                (node) =>
                  pages.findIndex(
                    (page) => page === item.read_more && node.id === page
                  ) > -1
              );
              if (nodeAccordionLink) {
                const path =
                  nodeAccordionLink.id === pages_list.nodeBase.id
                    ? `${pages_list.nodeBase.path}`
                    : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                item.read_more = path;
                item.internal_link = true;
              }
            }
            item?.tags?.forEach((tag: any) => {
              if (tag.url && !re.test(tag.url)) {
                const nodeAccordionLink = nodes.find(
                  (node) =>
                    pages.findIndex(
                      (page) => page === tag.url && node.id === page
                    ) > -1
                );
                if (nodeAccordionLink) {
                  const path =
                    nodeAccordionLink.id === pages_list.nodeBase.id
                      ? `${pages_list.nodeBase.path}`
                      : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                  tag.url = path;
                  tag.internal_link = true;
                }
              }
            });
          });
        }
        if (component.component === "CampaignCarousel") {
          const re = new RegExp("^(http|https)://", "i");
          component.props.slides.forEach((slide: any) => {
            const item = slide.props;
            if (item.explore_link && !re.test(item.explore_link)) {
              const nodeAccordionLink = nodes.find(
                (node) =>
                  pages.findIndex(
                    (page) => page === item.explore_link && node.id === page
                  ) > -1
              );
              if (nodeAccordionLink) {
                const path =
                  nodeAccordionLink.id === pages_list.nodeBase.id
                    ? `${pages_list.nodeBase.path}`
                    : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                item.explore_link = path;
                item.internal_link = true;
              }
            }
          });
        }
        if (component.component === "TextImageHeader") {
          const re = new RegExp("^(http|https)://", "i");
          component.props?.tags?.forEach((tag: any) => {
            if (tag.url && !re.test(tag.url)) {
              const nodeAccordionLink = nodes.find(
                (node) =>
                  pages.findIndex(
                    (page) => page === tag.url && node.id === page
                  ) > -1
              );
              if (nodeAccordionLink) {
                const path =
                  nodeAccordionLink.id === pages_list.nodeBase.id
                    ? `${pages_list.nodeBase.path}`
                    : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
                tag.url = path;
                tag.internal_link = true;
              }
            }
          });
          if (
            component.props.read_more &&
            !re.test(component.props.read_more)
          ) {
            const nodeAccordionLink = nodes.find(
              (node) =>
                pages.findIndex(
                  (page) =>
                    page === component.props.read_more && node.id === page
                ) > -1
            );
            if (nodeAccordionLink) {
              const path =
                nodeAccordionLink.id === pages_list.nodeBase.id
                  ? `${pages_list.nodeBase.path}`
                  : `${pages_list.nodeBase.path}/${nodeAccordionLink.path}`;
              component.props.read_more = path;
              component.props.internal_link = true;
            }
          }
        }
      });
      const path =
        pages_list.nodeBase.id === nodeFinded.id
          ? `${nodeFinded.path == "" ? "" : nodeFinded.path}`
          : `${
              pages_list.nodeBase.path == ""
                ? nodeFinded.path
                : pages_list.nodeBase.path + "/" + nodeFinded.path
            }`;

      // Fallback to page text if description not provided.
      let metatags = nodeFinded.metatag;
      if (
        metatags.description.trim() == "" &&
        nodeFinded.page_props.hasOwnProperty("text")
      ) {
        metatags.description = nodeFinded.page_props.text;
      }
      if (
        typeof nodeFinded.page_props.custom_css !== "undefined" &&
        nodeFinded.page_props.custom_css !== ""
      ) {
        // Let custom CSS be defined
        metatags.custom_css = nodeFinded.page_props.custom_css;
      }
      return {
        path: path,
        meta: Object.assign({}, metatags),
        view: [
          menus,
          {
            component: "CarouselNavigation",
            props: {
              isMain: nodeFinded.id === pages_list.nodeBase.id,
              prev: !prevNode
                ? null
                : prevNode.id !== pages_list.nodeBase.id
                ? `${pages_list.nodeBase.path}/${prevNode.path}`
                : pages_list.nodeBase.path,
              actual: {
                component: "DynamicComponentMatcher",
                props: {
                  view: [
                    pages_list.nodeBase.id === nodeFinded.id
                      ? {
                          component: "IntroPage",
                          props: Object.assign(
                            {
                              isMain: true,
                              active: true,
                              path: path === "" ? "/" : path,
                            },
                            nodeFinded.page_props
                          ),
                        }
                      : {
                          component: "CarouselItem",
                          // We assign the active prop for scale only this element.
                          props: Object.assign(
                            { ...nodeFinded.page_props },
                            { active: true }
                          ),
                        },
                  ]
                    .concat(nodeFinded.components)
                    .concat(
                      prepareBottomMenu(
                        prevNode,
                        nextNode,
                        nodesForCollection,
                        pages_list.nodeBase,
                        nodeFinded
                      )
                    ),
                },
              },
              next: !nextNode
                ? null
                : nextNode.id !== pages_list.nodeBase.id
                ? `${pages_list.nodeBase.path}/${nextNode.path}`
                : pages_list.nodeBase.path,
              slides: slides,
            },
          },
        ],
      };
    })
    .concat(independentNodesComponents as any)
    .filter(Boolean);
}

// export function getNodes() {
//   const nodes = loadFilesAndParse(
//     "./data/nodes",
//     fs
//       .readdirSync(path.join("./data/nodes"))
//       .filter((value) => value.endsWith(".json"))
//   );
//   const pages = nodes
//     .map((node) => ({ list: node.list, nodeBase: node }))
//     .filter((value) => value.list !== undefined);
//   return {
//     paths: pages
//       .map((pages_list) => generatePageWithComponents(pages_list, nodes))
//       .flat(),
//   };
// }

export async function getNodes(api_url: string) {
  let nodes = await getData(api_url);
  const pages = nodes
    .map((node) => ({ list: node.list, nodeBase: node }))
    .filter((value) => value.list !== undefined);
  return {
    paths: pages
      .map((pages_list) => generatePageWithComponents(pages_list, nodes))
      .flat(),
  };
}
