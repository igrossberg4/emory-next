import Link from "next/link";
import Icons from "./Icons"

function IconButton(props: any) {
    return props.link ?
        props.target ?
        <a href={props.link} className="icon-button" target={props.target} title={props.title}>
            <Icons icon={props.icon} />
        </a>:
        <Link href={props.link}>
        <a className="icon-button">
            <Icons icon={props.icon} />
        </a>
        </Link> : <button className="icon-button">
            <Icons icon={props.icon} />
        </button>
}

export default IconButton;
