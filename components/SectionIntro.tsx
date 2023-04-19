import MediaWithExpantion from "./MediaWithExpantion";

export default function SectionIntro(props: any) {
  // const multipleSizesImgPrincipal = props.background_image
  //   ? require(`../public/images/${props.background_image}?resize&sizes[]=2048&format=png`)
  //   : undefined;

  let isExternalImg =
    props.background_image && props.background_image.startsWith("https://");
  let multipleSizesImgPrincipal = isExternalImg
    ? undefined
    : props.background_image
    ? require(`../public/images/${props.background_image}?resize&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=png`)
    : undefined;

  return (
    <div
      className="section component-intro-text"
      style={
        !props.is_in_dynamic_accordion &&
        multipleSizesImgPrincipal !== undefined
          ? isExternalImg
            ? props.background_image
            : { backgroundImage: `url(${multipleSizesImgPrincipal.src})` }
          : {}
      }
    >
      {/* We check for props.items to see if  */}
      {((isExternalImg && props.background_image !== null) ||
        multipleSizesImgPrincipal !== undefined) &&
      props.is_in_dynamic_accordion ? (
        <div className="dynamic-component-bg-img">
          <img
            src={
              isExternalImg
                ? props.background_image
                : multipleSizesImgPrincipal.src
            }
            alt="Background image"
          ></img>
        </div>
      ) : (
        ""
      )}

      <div className="container">
        <div className="row header-container">
          <div className="col-md-6">
            <h2
              className="text-body--lg"
              dangerouslySetInnerHTML={{ __html: props.header }}
            ></h2>
          </div>
        </div>
        <div className="row body-container">
          <div className="col-md-8 image-container">
            <MediaWithExpantion
              img_src={props.img_src}
              thumb_src={props.thumb_src}
              img_size={props.img_size}
              media_src={props.media_src}
              media_alt={props.media_alt}
              media_type={props.media_type}
              size="big"
              header={props.media_header}
              text={props.media_text}
              byline={props.media_byline}
              disabled={props.disabled}
            />
          </div>
          <div className="col-md-6 text-container">
            {props.background_image && (
              <div
                className="background-image"
                style={
                  isExternalImg
                    ? {
                        backgroundImage: `url(${props.background_image})`,
                      }
                    : {
                        backgroundImage: `url(${multipleSizesImgPrincipal.src})`,
                      }
                }
              />
            )}
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: props.text }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
