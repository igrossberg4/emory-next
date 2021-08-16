import Head from "next/head";
import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box } from "@chakra-ui/react";
import { Context } from "../state/Store";
import MediaWithExpantion from "./MediaWithExpantion";

export default function ColumnsText(props:any) {
  return (
    <div className="columns-text container">
      <div className="row">
        <div className="columns-text__column col-md-6">
          <p>{props.column1}</p>
        </div>
        <div className="columns-text__column col-md-6">
          <p>{props.column2}</p>
        </div>
      </div>
    </div>
  );
}
