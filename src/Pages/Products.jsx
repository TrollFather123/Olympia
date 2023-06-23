import React, { useCallback, useEffect } from "react";
import Wrapper from "../Layout/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../Redux/ProductSlice";
import {
  Box,
  Container,
  Grid,
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

const ProductWrapper = styled(Box)``;

export default function Products() {
  const dispatch = useDispatch();
  const product_data = useSelector((s) => s.product);
  // console.log(product_data?.productList, "product_data");

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
  };

  // console.log(
  //   product_data?.productList[0]?.images.map((data) => data),
  //   "images"
  // );

  const PageLoading = useCallback((page) => {
    dispatch(GetProduct(page));
  }, []);

  return (
    <Wrapper>
      <Container fixed>
        <ProductWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={PageLoading}
            hasMore={true || false}
            threshold={2500}
            loader={
              <Grid container spacing={4}>
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (data) => (
                    <Grid item md={4} xs={12} key={data}>
                      <Skeleton variant="rounded" width={362} height={492} />
                    </Grid>
                  )
                )}
              </Grid>
            }
            initialLoad={false}
          >
            <Grid container spacing={4}>
              {product_data?.productList.map((data, index) => (
                <Grid item md={4} xs={12}>
                  <Paper className="each_product">
                    <Box className="product_fig">
                      <Slider {...settings}>
                        {data?.images.map((data, index) => {
                          return (
                            <Box key={index}>
                              <figure>
                                <img src={data} alt="images" />
                              </figure>
                            </Box>
                          );
                        })}
                      </Slider>
                    </Box>
                    <Box className="product_content">
                      <Typography variant="h4">{data?.title}</Typography>
                      <Typography variant="h6">
                        price is {data?.price}
                      </Typography>
                      <Typography variant="body1">
                        {data?.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </ProductWrapper>
      </Container>
    </Wrapper>
  );
}
