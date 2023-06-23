import React, { useEffect } from "react";
import Wrapper from "../Layout/Wrapper";
import styled from "@emotion/styled";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../Validation/Login.schema";
import ErrorText from "../Validation/ErrorText";
import { CurrentUser, CurrentUserUpdate } from "../Redux/UserSlice";

const DetailsForm = styled(Box)``;

export default function UserEditDetails() {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userDetails} = useSelector((s)=>s.user)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  useEffect(()=>{
    dispatch(CurrentUser())
  },[])


  useEffect(()=>{
    if(userDetails){
        setValue("name",userDetails?.name)
        setValue("email",userDetails?.email)
        setValue("password",userDetails?.password)
        setValue("role",userDetails?.role)
    }
  },[])


  const FormSubmit =(data)=>{
    // setValue("id",userDetails?.id)
    dispatch(CurrentUserUpdate(data)).then(()=>navigate("/details"))
    reset()
  }


  return (
    <Wrapper>
      <Container fixed>
        <DetailsForm>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className="form_group">
              <TextField label="" variant="outlined" placeholder="Name" fullWidth {...register("name")}/>
              <ErrorText text={errors?.name?.message}/>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="form_group">
              <TextField label="" variant="outlined" placeholder="Name" fullWidth {...register("role")} disabled/>
             
            </Box>
          </Grid>
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
              <ErrorText text={errors?.email?.message}/>
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
              <ErrorText text={errors?.password?.message}/>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="form_group">
              <input type="file" {...register} onChange={(e)=>setValue("avatar",e.target.value)}/>
              <ErrorText text={errors?.avatar?.message}/>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit(FormSubmit)}>
                Submit
            </Button>
            </Grid>
        </Grid>
        </DetailsForm>
      </Container>
    </Wrapper>
  );
}
