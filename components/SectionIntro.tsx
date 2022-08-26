import MediaWithExpantion from "./MediaWithExpantion";

export default function SectionIntro(props:any) {
  const multipleSizesImgPrincipal = props.background_image ? require(`../public/images/${(props.background_image)}?resize&sizes[]=2048&format=png`) : undefined;

  return (
    <div
      className='section component-intro-text'
      style={{ backgroundImage: `url(${multipleSizesImgPrincipal.src})` }}
    >
      <div className='container'>
        <div className='row header-container'>
          <div className='col-md-6'>
            <h2
              className='text-body--lg'
              dangerouslySetInnerHTML={{ __html: props.header }}
            ></h2>
          </div>
        </div>
        <div className='row body-container'>
          <div className='col-md-8 image-container'>
            <MediaWithExpantion
              img_src={props.img_src}
              img_size={props.img_size}
              media_src={props.media_src}
              media_alt={props.media_alt}
              media_type={props.media_type}
              size='big'
              header={props.media_header}
              text={props.media_text}
              byline={props.media_byline}
              disabled={props.disabled}
            />
          </div>
          <div className='col-md-6 text-container'>
            {props.background_image && (
              <div
                className="background-image"
                style={{ backgroundImage: `url(${multipleSizesImgPrincipal.src})` }}
              />
            )}
            <div
              className='body'
              dangerouslySetInnerHTML={{ __html: props.text }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
