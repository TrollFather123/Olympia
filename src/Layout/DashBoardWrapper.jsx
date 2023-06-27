import React, { useEffect } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser, LoggedOut } from "../Redux/UserSlice";

const AdminWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  .sidenav{
    width: 300px;
    flex-basis: 300px;
    background: #1976d2;
    padding: 50px 0;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }
  .sidenav ul li a{
    padding: 15px 30px;
    color: #fff;
  }
  .body_wrapper{
    width: calc(100% - 300px);
    flex-basis: calc(100% - 300px);
   margin-left: auto;
  }
  .dash_header{
    padding: 15px 30px;
    flex-wrap: wrap;
    box-shadow: 0px 15px 15px 0px rgba(186, 128, 96, 0.15);
  }
  .avatar_name{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .avatar_name p{
    margin-right:20px;
  }
  .dashboard_body {
    min-height: calc(100vh - 87px);
    padding: 0 30px;
  }
`;

export default function DashBoardWrapper({ children }) {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((s) => s.user);
  console.log(userDetails, "userDetails");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CurrentUser());
  }, []);

  const Logout = () => {
    dispatch(LoggedOut());
    navigate("/signin");
  };

  return (
    <AdminWrapper>
      <Box className="sidenav">
        <List disablePadding>
          <ListItem disablePadding>
            <Link to={"/dashboard/products"}>Products</Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={"/dashboard/categories"}>Categories</Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to={"/"}>Home</Link>
          </ListItem>
        </List>
      </Box>
      <Box className="body_wrapper">
        <Stack className="dash_header" justifyContent={"space-between"} direction={"row"}>
          <Typography variant="h3">Admin Panel</Typography>
          <Box className="avatar_name">
            <Typography variant="body1">{userDetails?.name}</Typography>
            <Button variant="contained" onClick={Logout}>
              Logout
            </Button>
          </Box>
        </Stack>
        <Box className="dashboard_body">{children}</Box>
      </Box>
    </AdminWrapper>
  );
}
