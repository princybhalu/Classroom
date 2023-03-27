import React from 'react'
import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { UploadAssignmentApiCall } from '../services/assignmentApis';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function UploadAssignment(props) {

    const user = useSelector(state => state.user);

    const today = new Date();

    const navigate = useNavigate();

    const [file, fileChange] = useState();

    // form controller
    const formik = useFormik({

        // intial values
        initialValues: {
            Title: '',
            Instructions: '',
            Points: 0,
            Attach: '',
            DueDate: today,
        },

        // To check enter value is vaild or not 
        validationSchema: Yup.object({
            Title: Yup.string().required("Title is required"),
            // discription: Yup.string().required("Description is required"),
        }),

        // for when click on submit button  
        onSubmit: async (values) => {

            //Request Body To Pass Api
            const formData = new FormData();
            console.log(file)
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

            const dateString = values.DueDate;
            const date1 = new Date(dateString);
            console.log(date1);
            const isoDate = date1.toISOString();
            console.log(isoDate);

            const RequestBody = {

                user_Id: user._id,
                Title: values.Title,
                Instructions: values.Instructions,
                Points: parseInt(values.Points),
                DueDate: isoDate,
                Attach: urlData,
                Classid: props.class_id
            }

            try {
                // call to backend url
                console.log(file)
                const response = await UploadAssignmentApiCall(RequestBody);

                //  status of respose 
                if (response.status === 200) {
                    toast.success("Assigment Upload Successfully");
                    console.log(response.data);
                    navigate('/');
                }

            } catch (err) {
                toast.error(err.message);
                console.log(err.message);
            }
        }
    });


    return (
        <>

            <Box md={{ Width: '100%' }} sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container>

                    {/* <form onSubmit={formik.handleSubmit} action="/uploadphoto" enctype="multipart/form-data" method="POST" > */}
                    <form onSubmit={formik.handleSubmit}>
                        {/* <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" > Assigment </Typography>
                        </Box> */}

                        <Grid container spacing={2}>


                            <Grid item xs={12} md={4} >
                                {/* Title */}
                                <TextField
                                    error={Boolean(formik.touched.Title && formik.errors.Title)}
                                    // fullWidth
                                    helperText={formik.touched.Title && formik.errors.Title}
                                    label="Title"
                                    margin="normal"
                                    name="Title"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Title}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={0} >
                                {/* Instructions */}
                                <TextField
                                    error={Boolean(formik.touched.Instructions && formik.errors.Instructions)}
                                    fullWidth
                                    helperText={formik.touched.Instructions && formik.errors.Instructions}
                                    label="Instructions"
                                    margin="normal"
                                    name="Instructions"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Instructions}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                {/* Points */}
                                <TextField
                                    error={Boolean(formik.touched.Points && formik.errors.Points)}
                                    fullWidth
                                    helperText={formik.touched.Points && formik.errors.Points}
                                    label="Points"
                                    margin="normal"
                                    name="Points"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Points}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={4} >
                                {/* Due Date */}
                                <TextField

                                    error={Boolean(formik.touched.DueDate && formik.errors.DueDate)}
                                    fullWidth
                                    helperText={formik.touched.DueDate && formik.errors.DueDate}
                                    label="Due Date"
                                    margin="normal"
                                    name="DueDate"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="date"
                                    value={formik.values.DueDate}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    value={formik.values.image}
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        fileChange(e.target.files[0])
                                    }}
                                />

                            </Grid>
                        </Grid>


                        <Box sx={{ py: 2 }}>
                            {/* Submit btn */}
                            <Button color="primary" disabled={formik.isSubmitting} size="large" sx={{ marginRight: '5px' }} type="submit" variant="contained" >
                                Post
                            </Button>
                            {/* Cancle btn */}
                            <Button color="error" onClick={() => props.SetopenUplaodFormCallBack(0)} size="large" type="submit" variant="contained" >
                                Cancle
                            </Button>
                        </Box>

                    </form>


                </Container>
            </Box>
        </>
    );
}
