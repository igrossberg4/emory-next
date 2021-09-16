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
        <div dangerouslySetInnerHTML={{__html:props.columns1}} className="columns-text__column col-md-6">
        </div>
        <div  dangerouslySetInnerHTML={{__html:props.column2}} className="columns-text__column col-md-6">
        </div>
      </div>
    </div>
  );
}
