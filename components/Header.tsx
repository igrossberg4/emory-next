import React, { useCallback, useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import SchoolsMenu from "./SchoolsMenu";
import Link from "next/link";
import MainMenuV2 from "./MainMenuV2";

export default function Header(props: any) {
  const [scroll, setScroll] = useState(0);
  let lastScroll = 0;
  const handleScroll = useCallback(() => {
    if (Date.now() - lastScroll < 100) {
      return;
    }
    lastScroll = Date.now();
    const currentScrollY = window.scrollY;
    const element = document.getElementById("header");
    // Offset from top (in pixels) where the header will be always visible.
    const scrollOffset = 400;

    if (element) {
      if (currentScrollY > scrollOffset) {
        element.classList.remove("in-offset");
        if (currentScrollY > scroll) {
          element.classList.add("hide");
        } else {
          if (currentScrollY < scroll) {
            element.classList.remove("hide");
            element.style.backgroundColor = "white";
          }
        }
      } else {
        element.classList.remove("hide");
        element.classList.add("in-offset");
      }
    }
    setScroll(window.scrollY);
  }, [scroll]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]); // @ts-ignore

  return (
    <header id="header" className={"in-offset"} role="banner">
      <SchoolsMenu {...props.menu_school} />
      <div className="header__logo">
        <Link href="/" passHref>
          <svg
            width="106"
            height="36"
            viewBox="0 0 106 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.2304 28.8558C4.11229 28.7164 5.99419 28.6815 7.87609 28.6815H17.181V30.0755H0.17425L0 28.8558C3.51984 25.7193 7.03969 22.5131 10.5595 19.3417C12.6854 17.4598 14.4279 15.4734 14.4279 12.546C14.4279 9.02613 11.8141 6.93513 7.84124 6.93513C3.48499 6.93513 1.98645 9.13068 1.7425 11.1171H0.0696999C0.0696999 8.60793 2.3698 5.47144 7.91094 5.47144C12.8248 5.47144 16.1007 7.98063 16.1007 12.4763C16.1007 15.9613 14.1491 18.1917 11.6747 20.4221L2.2304 28.8558Z"
              fill="#212322"
            />
            <path
              d="M80.4684 22.5827C80.4684 18.8886 77.4713 16.6582 73.6726 16.6582C72.9756 16.6582 70.8846 16.7279 69.7694 17.5643L68.9679 16.484L78.5865 7.28358H65.7617V5.85474H81.2351V6.83054L72.1392 15.4385L72.1741 15.5082C72.7317 15.4036 73.2893 15.3339 73.8469 15.3339C78.3425 15.3339 82.0366 17.9477 82.0366 22.5827C82.0366 26.9738 78.7607 30.4937 72.5923 30.4937C69.2815 30.4937 66.5632 29.5527 65.0647 28.2284L66.0405 27.1481C67.6436 28.4027 69.874 29.03 72.5923 29.03C77.8546 28.9951 80.4684 25.998 80.4684 22.5827Z"
              fill="#212322"
            />
            <path
              d="M89.5296 19.2372C90.9585 16.2052 94.3737 14.7415 97.336 14.7415C101.657 14.7415 105.63 17.8432 105.63 22.6873C105.63 27.3224 101.971 30.4588 97.1617 30.4588C91.2024 30.4588 87.7871 25.7193 87.7871 18.6099C87.7871 11.2914 91.3767 5.47144 97.7891 5.47144C100.229 5.47144 102.389 6.34268 103.47 7.38818C103.086 7.73668 102.738 8.08518 102.354 8.39883C101.448 7.56243 99.7058 6.93513 97.8239 6.93513C92.457 6.93513 89.4599 12.1626 89.4599 18.7493C89.4599 18.9235 89.4599 19.0978 89.4948 19.272L89.5296 19.2372ZM97.1617 28.9951C100.926 28.9951 104.027 26.486 104.027 22.6525C104.027 18.7493 100.751 16.1704 97.2315 16.1704C93.6419 16.1704 89.1463 18.8538 89.9478 23.2101C90.6448 26.6254 93.6767 29.0648 97.1617 28.9951Z"
              fill="#212322"
            />
            <path
              d="M41.4367 36C31.5044 36 23.4541 27.9497 23.4541 18.0174C23.4541 8.08519 31.5044 0 41.4367 0C51.3689 0 59.4193 8.05034 59.4193 17.9826C59.4541 27.9148 51.3689 36 41.4367 36ZM41.4367 1.63795C32.4105 1.63795 25.092 8.95644 25.092 17.9826C25.092 27.0087 32.4105 34.3272 41.4367 34.3272C50.4628 34.3272 57.7813 27.0087 57.7813 17.9826C57.7813 8.95644 50.4977 1.63795 41.4367 1.63795Z"
              fill="#212322"
            />
          </svg>
        </Link>
      </div>
      <MainMenuV2 {...props.main_menu} />
    </header>
  );
}
