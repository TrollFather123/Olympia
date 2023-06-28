import React, { useCallback, useEffect } from "react";
import Wrapper from "../Layout/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../Redux/ProductSlice";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import { GetCategory } from "../Redux/CategorySlice";
import DashBoardWrapper from "../Layout/DashBoardWrapper";

const ProductWrapper = styled(Box)`
padding: 50px 0;
  h3 {
    margin-bottom: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }
  ul li {
    width: calc(100% / 6);
    padding: 10px;
  }
  /* ul li:first-child {
    width: 100%;
  } */
  ul li a {
    display: inline-block;
  }
  ul li  figure{
    height: 200px;
    margin-bottom: 20px;
  }
  ul li  figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;





export default function DashboardCategory() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  console.log(categoryList, "categoryList");

  useEffect(() => {
    dispatch(GetCategory());
  }, []);
  return (
    <DashBoardWrapper>
        <ProductWrapper>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ marginBottom: "30px" }}
        >
          <Typography variant="h2">Categories</Typography>
          <Link to={"/dashboard/createcategory"} className="redirect_btn">
            Add Category
          </Link>
        </Stack>
          <List disablePadding>
            <ListItem disablePadding>
              <Link to={"/products"}>
                <figure>
                  <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=1060&t=st=1687521371~exp=1687521971~hmac=78dfa3466434c5f3c70373136519dbdea8b83c4752a8cfd1e28207b17d0c3299" alt="" />
                </figure>
                All</Link>
            </ListItem>
            {categoryList?.map((item, index) => (
              <ListItem disablePadding>
                <Box>
                  <figure>
                    <img src={item?.image} alt="" />
                  </figure>
                  {item?.name}
                </Box>
              </ListItem>
            ))}
          </List>
        </ProductWrapper>
    </DashBoardWrapper>
  )
}
