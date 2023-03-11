/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/slices/userSlice";
import CaptchaTest from "./ChaptaTest";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderTop: "10px solid #000",
  boxShadow: 24,
  p: 4,
};

const login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ChaptaTestResult, SetChaptaTestResult] = useState(0);
  const [OpenCaptchaTest, SetOpenCaptchaTest] = useState(false);
  const [CheckBoxOfCaptacha , SetCheckBoxOfCaptacha] = useState(false);
  const [ErrorMsg , SetErrorMsg] = useState("");

  const handleChange = () => {
    SetOpenCaptchaTest(true);
    SetCheckBoxOfCaptacha(true);
    SetErrorMsg("");
  };

  // form controller
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    // initial values
    initialValues: {
      userId: "",
      password: "",
    },
    // To check enter value is vaild or not
    validationSchema: Yup.object({
      userId: Yup.string().max(255).required("User Id  is required"),
      password: Yup.string().max(255).required("Password is required"),
      // isDoneCaptcha: Yup.boolean().oneOf([true], 'Please Verify Captcha Test')
    }),

    // for when click on submit button
    onSubmit: async (values) => {
      if (CheckBoxOfCaptacha === false) {
        SetErrorMsg("Please Verify Captcha Test");
        return;
      }
      // if(ChaptaTestResult === 0 ) return ;
      // set object to pass request of Backend url
      const requestUserLogin = {
        userId: values.userId,
        password: values.password,
      };

      try {
        // call to backend url
        const response = await axios.post("/login/login", requestUserLogin);

        // status of response
        console.log(response);
        if (response.status === 200) {
          toast.success("Successfullly Login.");
          dispatch(signIn(response.data));
          navigate("/");
        }
      } catch (err) {
        if (err.status === 400) {
          toast.error("Wrong Password");
        } else if (err.status === 404) {
          toast.error("You are not Authorize");
        } else {
          toast.error(err.message);
        }
        console.log(err);
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Login{" "}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {" "}
                Login For admin , teacher and student{" "}
              </Typography>
            </Box>

            {/* User Id */}
            <TextField
              error={Boolean(formik.touched.userId && formik.errors.userId)}
              fullWidth
              helperText={formik.touched.userId && formik.errors.userId}
              label="User Id"
              margin="normal"
              name="userId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userId}
              variant="outlined"
            />

            {/* Date of birth */}
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />

            <Box sx={{ alignItems: "center", display: "flex", ml: -1 }}>
              <Checkbox
                name="captchaCheckbox"
                id="captchaCheckbox"
                checked={CheckBoxOfCaptacha}
                onChange={handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                Open Captcha Test
              </Typography>
            </Box>

            {/* to display error if check box is not checked */}
            <FormHelperText error>{ErrorMsg}</FormHelperText>

            <Modal
              open={OpenCaptchaTest}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ paddingLeft: "40%" }}>
                  <CaptchaTest
                    parentCallbackChaptaTestResult={SetChaptaTestResult}
                    parentCallBackOpenCaptchaTest={SetOpenCaptchaTest}
                  />
                </div>
              </Box>
            </Modal>

            {/* Submit Btn */}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default login;
