import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
// import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Paper,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { pathConfiger } from "../config";
import { login } from "../API/auth";
import { getToken, setToken } from "../API/localstorage";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className="text-white"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Kometa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({});
  const [authenticationSuccess, setAutheticationSuccess] = useState(false);
  const [err, setErr] = useState({ message: "", isErr: false });
  const pathDashboard = pathConfiger("/webviewer");
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdate = (key, value) =>
    setValues((prevState) => ({ ...prevState, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values)
      .then((res) => {
        const token = res.data.access_token;
        setToken("Bearer " + token);
        setAutheticationSuccess(true);
      })
      .catch((err) => setErr({ message: err.message, isErr: true }));
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAutheticationSuccess(true);
    }
  }, []);

  if (authenticationSuccess) return <Redirect to={pathDashboard} />;
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="w-100 h-100 d-flex align-items-center justify-content-center flex-column"
    >
      <CssBaseline />
      <Paper className="p-4 text-center">
        <Avatar className="m-auto" />
        <Typography component="h1" variant="h5">
          Login Kometa PACS
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            name="username"
            onChange={(e) => handleUpdate("username", e.target.value)}
          />
          <FormControl variant="outlined" className="w-100">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleUpdate("password", e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ height: "50px" }}
          >
            Sign In
          </Button>
          {err.isErr && <span className="text-danger">{err.message}</span>}
        </form>
      </Paper>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
