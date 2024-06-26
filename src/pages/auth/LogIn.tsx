import {
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { LogInProps } from "../../utils/types";
import FormikControl from "../../components/validation/FormikControl";
import { useState, MouseEvent } from "react";
import { Apple, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { loginUserSuccess } from "../../redux/slices/auth/auth.reducer";
import { toast, ToastContent } from "react-toastify";
import { LoginSchema } from "../../components/validation/ValidationSchema";

const LogIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const intialValues: LogInProps = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: LogInProps,
    { resetForm }: FormikHelpers<LogInProps>
  ): Promise<void> => {
    const { email, password } = values;
    const payload = {
      email: email,
      password: password,
    };
    const response = await login(payload);
    if ("data" in response) {
      const { msg } = response.data;
      dispatch(loginUserSuccess(response.data));
      localStorage.setItem(
        "session",
        JSON.stringify(response.data?.session?.tokenId)
      );
      localStorage.setItem("userData", JSON.stringify(response.data?.user));
      toast.success(msg as ToastContent);
      navigate("/");
      resetForm();
    }
    if ("error" in response) {
      //@ts-ignore
      const errMsg = response.error.error;
      toast.error(errMsg as ToastContent);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Grid
          item
          container
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Grid
            item
            container
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Grid item sx={{ width: "100%" }}>
              <Typography variant="h1" color={"black"} fontWeight={600}>
                Welcome back!
              </Typography>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Typography variant="h6" color={"black"} fontWeight={400}>
                Enter your Credentials to access your account
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item sx={{ width: "100%" }}>
              <Formik
                initialValues={intialValues}
                onSubmit={handleSubmit}
                validationSchema={LoginSchema}
              >
                <Form>
                  <Grid item container flexDirection={"column"} gap={3}>
                    <Grid item>
                      <FormikControl name="email" placeholder="Email address" />
                    </Grid>
                    <Grid item>
                      <FormikControl
                        name="password"
                        type={!showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Grid item>
                        <FormikControl
                          name="offer"
                          control="checkbox"
                          label="Remember my password for 30 days"
                        />
                      </Grid>
                      <Grid item>
                        <Link to={"/auth/forgot-password"}>
                          <Button
                            variant="text"
                            sx={{
                              textTransform: "initial",
                              fontSize: "1.2rem",
                              borderRadius: "1rem",
                            }}
                          >
                            Forgot password ?
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ marginBottom: "3rem" }}>
                      <CustomButton
                        type="submit"
                        title="Login"
                        sx={{
                          bgcolor: "#3A5B22",
                          width: "100%",
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          textTransform: "initial",
                          borderRadius: "1rem",
                        }}
                        isSubmitting={isLoading}
                        disabled={isLoading}
                      />
                    </Grid>
                  </Grid>

                  <Grid item container>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: "1rem",
                        justifyContent: "space-between",
                        marginY: "1rem",
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<Google color="success" />}
                        sx={{
                          border: "1px solid #D9D9D9",
                          fontSize: "1rem",
                          borderRadius: "1rem",
                          color: "black",
                          textTransform: "initial",
                        }}
                      >
                        Sign in with Google
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Apple color="success" />}
                        sx={{
                          border: "1px solid #D9D9D9",
                          fontSize: "1rem",
                          borderRadius: "1rem",
                          color: "black",
                          textTransform: "initial",
                        }}
                      >
                        Sign in with Apple
                      </Button>
                    </Box>
                    <Box
                      width={"100%"}
                      sx={{ display: "flex", justifyContent: "center" }}
                      marginY={"1rem"}
                    >
                      <Typography variant="h6" fontWeight={400} color={"black"}>
                        Don’t have an account?{" "}
                      </Typography>
                      <Link to={"/auth/sign-up"}>
                        <Typography
                          variant="h6"
                          color={"blue"}
                          sx={{ paddingLeft: "0.5rem" }}
                        >
                          Sign Up
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LogIn;
