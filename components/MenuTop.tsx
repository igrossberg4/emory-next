import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
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

export default function MenuTop(props:any) {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton as={Button}>{props.title}</MenuButton>
      <MenuList>
        {props.options.map((option:any) => (
          <MenuItem
            key={option.title}
            onClick={() => router.push(option.route_to)}
          >
            {option.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
