import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginChecker } from "../Validation/LoginChecker";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser, LoggedOut } from "../Redux/UserSlice";
import styled from "@emotion/styled";


const HeaderWrapper = styled(Box)`
  .nav_list li a{
    color: #fff;
  }
  .nav_list li{
    width: auto;
  }
  .nav_list li:not(:last-child){
    margin-right: 15px;
  }
  .nav_list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`

export default function Header() {
  const naviagte = useNavigate();
  const dispatch = useDispatch()

  const { userDetails } = useSelector((s) => s.user);
  console.log(userDetails, "userDetails");


  useEffect(() => {
    dispatch(CurrentUser());
  }, []);


  const HandleLoggedOut = () =>{
    dispatch(LoggedOut())
    naviagte("/signin")
  }
  return (
    <HeaderWrapper sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <List disablePadding className="nav_list">
            <ListItem disablePadding>
              <Link to={"/"}>Home</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link to={"/details"}>User Details</Link>
            </ListItem>
            {
              userDetails?.role === "admin" && (
                <ListItem disablePadding>
                <Link to={"/dashboard"}>Admin Panel</Link>
              </ListItem>
              )
            }
          
          </List>
          {LoginChecker() ? (
           
             <Stack direction={"row"} marginLeft={"auto"}>
             <Button color="inherit" onClick={HandleLoggedOut}>
              Logout
             </Button>
           </Stack>
          ) : (
            <Stack direction={"row"} marginLeft={"auto"}>
              <Button color="inherit" onClick={() => naviagte("/signin")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => naviagte("/signup")}>
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HeaderWrapper>
  );
}
