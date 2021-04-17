import { useMutation } from "@apollo/client";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LOGIN_USER } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "30%",
    marginTop: "2rem",
  },
  link: {
    color: theme.palette.secondary.main,
  },
  error: {
    marginTop: "2rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  const history = useHistory();

  const { authSuccess, user } = useAuth();

  const [login, { loading }] = useMutation(LOGIN_USER, {
    variables: { email, password },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update: (_, result) => {
      console.log(result.data);
      setErrors(null);
      authSuccess(result.data.login);
      history.push("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      {/* Loading screen when redirecting after login */}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h4">Login</Typography>

        {/* Errors display */}
        {errors && errors.general && (
          <Typography color="error" className={classes.error}>
            {errors.general}
          </Typography>
        )}

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="login_email"
            label={errors?.email ? "Error" : "Email"}
            variant="filled"
            error={errors && errors.email}
            helperText={errors && errors.email ? errors.email : null}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="login_password"
            label={errors?.password ? "Error" : "Password"}
            type={showPassword ? "text" : "password"}
            error={errors && errors.password}
            helperText={errors?.password ? errors.password : null}
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Sign In
          </Button>

          <Typography variant="body2">
            New here? Click here to{" "}
            <Link to="/signup" className={classes.link}>
              sign up
            </Link>
          </Typography>
        </form>
      </Box>
    </>
  );
};

export default Login;
