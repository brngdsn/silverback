import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form";
import './App.css';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'by '}
      <Link color="inherit" href="https://github.com/brngdsn">
        brngdsn
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

interface IFormInput {
  username: string;
  password1: string;
  password2: string;
}

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IFormInput>({ mode: "onBlur" });

  console.log(errors)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data: any) => console.log(data))}
            noValidate
            sx={{ mt: 1 }}
            >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              { ...{
                color: errors.username && errors.username.type === "required" ? "error" : "primary",
                error: errors.username && errors.username.type === "required" ,
                helperText: errors.username && errors.username.message ? errors.username.message : "",
              } }
              {...register("username", { required: "Required field" })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password1"
              autoComplete="current-password"
              { ...{
                color: errors.password1 && errors.password1.type === "required" ? "error" : "primary",
                error: errors.password1 && errors.password1.type === "required" ,
                helperText: errors.password1 && errors.password1.message ? errors.password1.message : "",
              } }
              {...register("password1", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="current-password"
              { ...{
                color: errors.password2 && errors.password2.type === "matchesPreviousPassword" ? "error" : "primary",
                error: errors.password2 && errors.password2.type === "matchesPreviousPassword" ,
                helperText: errors.password2 && errors.password2.message ? errors.password2.message : "",
              } }
              {...register("password2", {
                required: "Passwords should match!!",
                validate: {
                  matchesPreviousPassword: (value: string) => {
                    const { password1 } = getValues();
                    return password1 === value || "Passwords should match!";
                  }
                }
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Object.keys(errors).length > 0}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

function App() {
  return (
    <SignIn />
  );
}

export default App;
