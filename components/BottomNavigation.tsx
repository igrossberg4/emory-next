import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Context } from "../state/Store";
import IconButton from "./IconButton";

function BottomNavigation(props: any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div className="section component-bottom-navigation">
      <div className="container">
        <div className="row">
          <div className="col-md-6"
            onClick={(e) => {
              dispatch({ type: "SET_NAV", payload:  props.previous_route  ? '/'+props.previous_route : '/' });
            }}
          >
            <div className="inner-wrapper">
              <Link href={props.previous_route === '' ? '/' : props.previous_route }>
                <a className="pre-title text-label">Previous</a>
              </Link>
              <h3 className="title header-h2"><Link href={props.previous_route === '' ? '/' : props.previous_route }><span dangerouslySetInnerHTML={{ __html: props.previous_title }}></span></Link></h3>
              <IconButton link={props.previous_route === '' ? '/' : props.previous_route } icon="chevron-left" label="Previous"></IconButton>
            </div>
          </div>
          <div className="col-md-6"
            onClick={(e) => {
              dispatch({ type: "SET_NAV", payload: props.next_route  ? '/'+props.next_route : '/' });
            }}
          >
            <div className="inner-wrapper">
              <Link href={props.next_route}>
                <a className="pre-title text-label">Next</a>
              </Link>
              <h3 className="title header-h2"><Link href={props.next_route}><span dangerouslySetInnerHTML={{ __html: props.next_title }}></span></Link></h3>
              <IconButton link={props.next_route === '' ? '/' : props.next_route} icon="chevron-right" label="Next"></IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;
