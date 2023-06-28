import React, { useCallback, useEffect } from "react";
import Wrapper from "../Layout/Wrapper";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetProductByCategory } from "../Redux/CategorySlice";
import { useParams } from "react-router";

const ProductWrapper = styled(Box)``;

export default function Category() {
  const dispatch = useDispatch();
  const { ProductListByCategory } = useSelector((s) => s.category);
  console.log(ProductListByCategory, "ProductListByCategory");
  const { id } = useParams();
  // console.log(product_data?.productList, "product_data");

  useEffect(() => {
    dispatch(GetProductByCategory({ id }));
  }, [id, GetProductByCategory]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  // console.log(
  //   product_data?.productList[0]?.images.map((data) => data),
  //   "images"
  // );

  const PageLoading = useCallback((page) => {
    dispatch(GetProductByCategory({ id, page }));
  }, []);
  console.log(ProductListByCategory[0]?.category?.name, "hello");
  return (
    <Wrapper>
      <Container fixed>
        <ProductWrapper>
          <Typography variant="h2">
            {ProductListByCategory[0]?.category?.name}
          </Typography>
          <InfiniteScroll
            pageStart={0}
            loadMore={PageLoading}
            hasMore={true || false}
            threshold={2000}
            loop
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
              {ProductListByCategory.map((data, index) => (
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
