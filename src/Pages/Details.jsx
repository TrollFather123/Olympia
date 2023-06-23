import React, { useEffect } from "react";
import Wrapper from "../Layout/Wrapper";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser } from "../Redux/UserSlice";
import { Link } from "react-router-dom";

const DetailsWrapper = styled(Box)``;

export default function Details() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((s) => s.user);
  console.log(userDetails, "userDetails");

  useEffect(() => {
    dispatch(CurrentUser());
  }, []);
  return (
    <Wrapper>
      <Container fixed>
        <DetailsWrapper>
          <figure>
            <img src={userDetails?.avatar} alt="image" />
          </figure>
          <Typography variant="h3">{userDetails?.name}</Typography>
          <Typography variant="h4">{userDetails?.role}</Typography>
          <Typography variant="body1">{userDetails?.email}</Typography>
          <Typography variant="body1">{userDetails?.password}</Typography>
          <Link to={`/user-details-edit`}>Edit</Link>
        </DetailsWrapper>
      </Container>
    </Wrapper>
  );
}
