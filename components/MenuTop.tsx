import Head from "next/head";
import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  Box,
} from "@chakra-ui/react";
import { Context } from "../state/Store";
import Link from "next/link";
import IconButton from "./IconButton";

export default function MenuTop(props:any) {
  const router = useRouter();
  const [state, dispatch] = useContext(Context) as any;
  return (
    <div style={{position: "fixed", top:0, zIndex:10, right:0}}>
    <Menu >
      <MenuButton  as={Button} rightIcon={<IconButton icon="menu" />}>{props.title}</MenuButton>
      <MenuList>
        {props.options.map((option:any) => (
          <MenuItem
            key={option.title}
            onClick={() => {
              dispatch({ type: "SET_NAV", payload: props.link_to });

            }}
          >
            <Link href={option.link_to}>{option.title}</Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    </div>
  );
}
