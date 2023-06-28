import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Wrapper(props) {
  const { children } = props;
  return (
    <>
      <Header />
      <Box className="cmn_gap">
      {children}
      </Box>
   
      <Footer />
    </>
  );
}
