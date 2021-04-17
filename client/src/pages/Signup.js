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
import { REGISTER_USER } from "../graphql/queries";

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

const Signup = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState(null);

  const history = useHistory();

  const { authSuccess, user } = useAuth();

  const [signup, { loading }] = useMutation(REGISTER_USER, {
    variables: { registerInput: { email, name, password, confirmPassword } },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update: (_, result) => {
      console.log(result.data);
      setErrors(null);
      authSuccess(result.data.register);
      history.push("/");
    },
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup();
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h4">Signup</Typography>

        {errors && errors.general && (
          <Typography color="error" className={classes.error}>
            {errors.general}
          </Typography>
        )}

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="register_email"
            label={errors?.email ? "Error" : "Email"}
            variant="filled"
            error={errors && errors.email}
            helperText={errors && errors.email ? errors.email : null}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="register_name"
            label={errors?.name ? "Error" : "Name"}
            variant="filled"
            error={errors && errors.name}
            helperText={errors && errors.name ? errors.name : null}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="register_password"
            label={errors?.password ? "Error" : "Password"}
            type={showPassword ? "text" : "password"}
            error={errors && errors.password}
            helperText={errors && errors?.password ? errors.password : null}
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="register_confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="filled"
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPassword}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
            Sign up
          </Button>

          <Typography variant="body2">
            Already registered? Click here to{" "}
            <Link to="/login" className={classes.link}>
              login
            </Link>
          </Typography>
        </form>
      </Box>
    </>
  );
};

export default Signup;
