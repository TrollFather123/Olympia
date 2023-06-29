import React, { useCallback, useEffect, useState } from "react";
import DashBoardWrapper from "../Layout/DashBoardWrapper";
import InfiniteScroll from "react-infinite-scroller";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProduct } from "../Redux/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import RangeSlider from "../Component/RangeSlider/RangeSlider";
import { FilterByAll } from "../Redux/FilterSlice";
import { GetCategory } from "../Redux/CategorySlice";
import styled from "@emotion/styled";

const ProductWrapper = styled(Box)`
  padding: 50px 0;
  .filter_head {
    min-width: 200px;
    display: flex;
    align-items: center;
  }
  .filter_head:not(:last-child) {
    margin-right: 20px;
  }
`;

export default function DashboardProduct() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productList } = useSelector((s) => s.product);
  const { filterProductList } = useSelector((s) => s.filters);
  const { categoryList } = useSelector((s) => s.category);
  const [title, setTitle] = useState("");
  const [listedData, setListedData] = useState([]);
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState([10, 500]);
  useEffect(() => {
    dispatch(GetProduct());
    dispatch(GetCategory());
  }, []);

  const PageLoading = useCallback((page) => {
    dispatch(GetProduct(page));
  }, []);

  useEffect(() => {
    if (filterProductList.length) {
      setListedData(filterProductList);
    }
    // else if(filterProductListByCategory.length){
    //   setListedData(filterProductListByCategory)
    //   // setListedData(filterProductListByCategory)
    // }
    else {
      setListedData(productList);
    }
  }, [filterProductList, productList]);

  const CategoryFilter = (e) => {
    setCategory(e.target.value);
    // dispatch(FilterByCategory(category))
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // dispatch(FilterByPriceRange(value));
  };



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
          <Typography variant="h2">Filters</Typography>
          <Link to={"/dashboard/createproduct"} className="redirect_btn">
            Add Product
          </Link>
        </Stack>

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
            <Button
              variant="contained"
              onClick={() =>
                dispatch(
                  FilterByAll({ title: title, id: category, value: value })
                )
              }
            >
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
          initialLoad={false}
        >
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
                    <Typography variant="h5">{data?.category?.name}</Typography>
                    <Typography variant="h6">price is {data?.price}</Typography>
                    <Typography variant="body1">{data?.description}</Typography>
                    <Link to={`/dashboard/productdetails/${data?.id}`} className="redirect_btn">Edit Product</Link>
                    <Button variant="contained" className="redirect_btn" onClick={()=>{dispatch(DeleteProduct(data?.id)).then(navigate("/dashboard/products"))}} sx={{}}>Delete Product</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </ProductWrapper>
    </DashBoardWrapper>
  );
}
