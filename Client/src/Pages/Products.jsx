import React, { useCallback, useEffect, useState } from "react";
import Wrapper from "../Layout/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../Redux/ProductSlice";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";
import { Stack } from "@mui/system";
import {
  FilterByAll,
  FilterByCategory,
  FilterByPriceRange,
  FilterByTitle,
} from "../Redux/FilterSlice";
import { GetCategory } from "../Redux/CategorySlice";
import RangeSlider from "../Component/ProductCard/RangeSlider/RangeSlider";

const ProductWrapper = styled(Box)`
  .filter_head {
    min-width: 200px;
    display: flex;
    align-items: center;
  
  }
  .filter_head:not(:last-child) {
      margin-right: 20px;
    }

`;

export default function Products() {
  const [title, setTitle] = useState("");
  const [listedData, setListedData] = useState([]);
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState([10, 500]);
  const dispatch = useDispatch();
  const product_data = useSelector((s) => s.product);
  const { filterProductList, filterProductListByCategory } = useSelector(
    (s) => s.filters
  );
  const { categoryList } = useSelector((s) => s.category);
  // console.log(product_data?.productList, "product_data");
  // console.log(filterProductList,"filterProductList")
  console.log(listedData, "listedData");

  useEffect(() => {
    // dispatch(FilterByCategory(category))

    dispatch(GetProduct());
    dispatch(GetCategory());
  }, [category, dispatch]);

  useEffect(() => {
    if (filterProductList.length) {
      setListedData(filterProductList);
    }
    // else if(filterProductListByCategory.length){
    //   setListedData(filterProductListByCategory)
    //   // setListedData(filterProductListByCategory)
    // }
    else {
      setListedData(product_data?.productList);
    }
  }, [filterProductList, product_data?.productList]);

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

  // const PageLoadingWithFilters = useCallback((page) => {
  //   dispatch(FilterByAll({title:title,id:category,value:value,page:page}))
    
  // }, []);


  const CategoryFilter = (e) => {
    setCategory(e.target.value);
    // dispatch(FilterByCategory(category))
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // dispatch(FilterByPriceRange(value));
  };

  

  return (
    <Wrapper>
      <Container fixed>
        <ProductWrapper>
        <Typography variant="h2" sx={{marginBottom:"30px"}}>Filters</Typography>
          <Stack direction={"row"} sx={{ marginBottom: "50px" }}>
           
            <Box className="filter_head">
              <TextField
                label="Filter By Name"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* <Button
                variant="contained"
                onClick={() => dispatch(FilterByTitle(title))}
              >
                Submit
              </Button> */}
            </Box>
            <Box className="filter_head">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={CategoryFilter}
                >
                  {categoryList.map((data, index) => (
                    <MenuItem value={data?.id} key={index}>
                      {data?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="filter_head">
              <RangeSlider value={value} handleChange={handleChange} />
            </Box>
            <Box className="filter_head">
              <Button variant="contained" onClick={()=>dispatch(FilterByAll({title:title,id:category,value:value}))}>
                Submit Filters
              </Button>
            </Box>
          </Stack>

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
            initialLoad={false}>
            <Grid container spacing={4}>
              {listedData.map((data, index) => (
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
