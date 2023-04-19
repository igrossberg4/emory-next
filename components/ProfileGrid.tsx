import Image from "next/image";
import { imageLoader } from "./utils/imageLoader";

export default function ProfileGrid(props: any) {
  return (
    <div className="section component-profile-grid">
      <div className="container">
        {props.header ? (
          <div className="row header-container">
            <h2 className={props.size == "small" ? "" : "header-h1"}>
              {props.header}
            </h2>
          </div>
        ) : (
          ""
        )}
        <div className="row body-container">
          {props.items.map((item: any, index: number) => {
            // const multipleSizesImgPrincipal = item.img_src ? require(`../public/images/${(item.img_src)}?resize&sizes[]=300&format=png`) : undefined;

            let isExternalImg =
              item.img_src && item.img_src.startsWith("https://");
            let multipleSizesImgPrincipal = isExternalImg
              ? undefined
              : require(`../public/images/${item.img_src}?resize&sizes[]=300&format=png`);

            return (
              <div
                key={index}
                className={`profile-grid-item col-sm-6 col-md-4 col-lg-3 ${
                  props.size == "small" ? "profile-grid-item--small" : ""
                }`}
              >
                <div className="profile-grid-item__image">
                  {isExternalImg ? (
                    //         <img src={props.img_src}
                    // alt={props.img_alt}</img>
                    <img
                      alt={props.media_alt}
                      src={item.img_src}
                      width={300}
                      height={300}
                    ></img>
                  ) : (
                    <Image
                      loader={imageLoader(multipleSizesImgPrincipal) as any}
                      alt={item.media_alt}
                      width={300}
                      height={300}
                      src={multipleSizesImgPrincipal.src}
                    ></Image>
                  )}
                </div>
                <div className="profile-grid-item__name">{item.name}</div>
                {item.description ? (
                  <div className="profile-grid-item__description">
                    {item.description}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
