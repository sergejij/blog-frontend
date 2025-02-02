import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {Navigate} from "react-router-dom";
import { useForm } from 'react-hook-form';

import styles from "./Login.module.scss";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const onSubmit = (values) => {
        dispatch(fetchAuth(values))
    };

    if (isAuth) {
        return <Navigate to="/" />
    }

    console.log('errors', errors)
    console.log('isAuth', isAuth);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
            fullWidth
            {...register('email', { required: 'Enter email please' })}
          />
          <TextField className={styles.field} label="Пароль" fullWidth
                     helperText={errors?.password?.message}
                     error={Boolean(errors?.password?.message)}
                     {...register('password', { required: 'Enter password please' })} />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Войти
          </Button>
        </form>
    </Paper>
  );
};
