import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Modal,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GetOneMaterialApiCall } from "../services/materialApis";
import { UpdateMaterialApiCall } from "../services/materialApis";
import { Formik, Form, Field } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderTop: "10px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateMaterial() {
  const user = useSelector((state) => state.user);

  const [file, fileChange] = useState();

  let { MaterialId } = useParams();

  // console.log(MaterialId);

  const navigate = useNavigate();

  const [material, SetMaterial] = useState({});
  const [IsSetMaterial, SetIsSetMaterial] = useState(0);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  //   const getOneMaterial = async () => {
  //     await GetOneMaterialApiCall(MaterialId).then((result) => {
  //       SetMaterial(result);
  //     });
  //   };
  //   getOneMaterial();

  //   console.log(material);
  GetOneMaterialApiCall(MaterialId).then(async (result) => {
    await SetMaterial(result);
    // console.log(result);
    SetIsSetMaterial(1);
  });
  console.log(material)

  return (
    <>
      <Modal
        open={1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="popup-model">
          {/* <div>{material === {} && "Loding..."}</div> */}

          {IsSetMaterial === 0 ? (
            <>Loding...</>
          ) : (
            <>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" className="Header">
                  {" "}
                  {material.materialObject.Title}
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {" "}
                  Edit Details{" "}
                </Typography>
              </Box>
              <Formik
                initialValues={
                  material !== {} && {
                    title: material.materialObject.Title,
                    description: material.materialObject.Description,
                    // title : '',
                    // description: '',
                    Attach: "",
                  }
                }
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  console.log("data");
                  console.log(values);

                  //Request Body To Pass Api
                  const formData = new FormData();
                  console.log(file);
                  formData.append("file", file);
                  formData.append("upload_preset", "classroom_preset");

                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/djj0dl6dz/image/upload`,
                    {
                      method: "post",
                      body: formData,
                    }
                  );

                  let urlData = await response.json();
                  urlData = urlData?.url;
                  console.log(urlData);

                  const RequestBody = {
                    user_Id: user._id,
                    Title: values.title,
                    Description: values.description,
                    Attach: urlData,
                  };

                  try {
                    console.log(file);
                    const response = await UpdateMaterialApiCall(
                      material.materialObject._id,
                      RequestBody
                    );

                    if (response.status === 200) {
                      toast.success("Material updated Successfully");
                      console.log(response.data);
                      navigate("/material/viewMaterial/" + user._id);
                    }
                  } catch (err) {
                    toast.error(err.message);
                    console.log(err.message);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                }) => (
                  <div>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={0}>
                          {/* Title */}
                          <TextField
                            error={Boolean(touched.title && errors.title)}
                            // fullWidth
                            helperText={touched.title && errors.title}
                            label="Title"
                            margin="normal"
                            name="title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} md={0}>
                          {/* Description */}
                          <TextField
                            error={Boolean(
                              touched.description && errors.description
                            )}
                            fullWidth
                            helperText={
                              touched.description && errors.description
                            }
                            label="Description"
                            margin="normal"
                            name="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            value={values.image}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              fileChange(e.target.files[0]);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box sx={{ py: 2 }}>
                            {/* Submit btn */}
                            <Button
                              color="primary"
                              disabled={isSubmitting}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <br />
                            <br />
                            <Button
                              onClick={() => {
                                navigate("/material/viewMaterial/" + user._id);
                              }}
                              size="large"
                              variant="contained"
                              color="error"
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  </div>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
