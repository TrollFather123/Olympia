import React from "react";
import Wrapper from "../Layout/Wrapper";
import styled from "@emotion/styled";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, UserSchema } from "../Validation/Login.schema";
import ErrorText from "../Validation/ErrorText";
import { useDispatch } from "react-redux";
import { CreateUser, LoginUser } from "../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";
const FormWrapper = styled(Box)``;
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const FormSubmit = (data) => {
    dispatch(LoginUser(data))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => alert(err?.message));
    reset();
  };
  return (
    <Wrapper>
      <FormWrapper>
        <Container fixed>
          <Grid container spacing={3}>
           
            <Grid item xs={12}>
              <Box className="form_group">
                <TextField
                  label=""
                  variant="outlined"
                  placeholder="Email"
                  type="email"
                  fullWidth
                  {...register("email")}
                />
                <ErrorText text={errors?.email?.message} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="form_group">
                <TextField
                  label=""
                  variant="outlined"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  {...register("password")}
                />
                <ErrorText text={errors?.password?.message} />
              </Box>
            </Grid>
         
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit(FormSubmit)}>
                Submit
              </Button>
            </Grid>
          </Grid>
          <Stack direction={"row"}><Link to={"/forget-password"}>Forget Password</Link></Stack>
        </Container>
      </FormWrapper>
    </Wrapper>
  );
}
