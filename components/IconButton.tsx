import Link from "next/link";
import Icons from "./Icons"

function IconButton(props: any) {
    return props.link ?
        props.target ?
        <a href={props.link} className="icon-button" target={props.target} title={props.title} aria-label={props.label} >
            <Icons icon={props.icon} />
        </a>:
        <Link href={props.link}>
        <a className="icon-button" aria-label={props.label}>
            <Icons icon={props.icon} />
        </a>
        </Link> : <button type="button" className="icon-button" aria-label={props.label}>
            <Icons icon={props.icon} />
        </button>
}

export default IconButton;
