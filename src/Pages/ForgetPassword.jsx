import React from "react";
import Wrapper from "../Layout/Wrapper";
import styled from "@emotion/styled";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgetPasswordSchema, LoginSchema, UserSchema } from "../Validation/Login.schema";
import ErrorText from "../Validation/ErrorText";
import { useDispatch } from "react-redux";
import { CreateUser, ForgetPasswordUser, LoginUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";





const FormWrapper = styled(Box)``;




export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const FormSubmit = (data) => {
    dispatch(ForgetPasswordUser(data))
      .unwrap()
      .then((data) => {alert(data?.message);setTimeout(()=>{navigate("/signin")},4000)})
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
              <Button variant="contained" onClick={handleSubmit(FormSubmit)}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </FormWrapper>
    </Wrapper>
  );
}
