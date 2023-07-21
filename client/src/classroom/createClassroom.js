import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { CreateClassroomApiCall } from '../services/classroomApis';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAsyncError, useNavigate } from "react-router";
import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from '../components/dashboard/navbar';
import { DepartmentSelectItemList } from '../model/DepartmentSelectItemList';


function CreateClassroom() {

    const user = useSelector(state => state.user);
    console.log(user._id);

    const navigate = useNavigate();

    // form controller
    const formik = useFormik({

        // intial values
        initialValues: {
            Sem: '',
            Batch: '',
            Subject: '',
            Department: '',
            Classname: '',
            Subtitle: ''
        },

        // To check enter value is vaild or not 
        validationSchema: Yup.object({
            Sem: Yup.number().max(9).min(0).required('Sem is required'),
            Batch: Yup.string().required("Batch is required"),
            Subject: Yup.string().required("Subject is required"),
            Department: Yup.string().required("Department is required"),
            Classname: Yup.string().required("Classname is required"),
        }),

        // for when click on submit button  
        onSubmit: async (values) => {

            //Request Body To Pass Api
            const RequestBody = {
                Sem: parseInt(values.Sem),
                Batch: values.Batch,
                Subject: values.Subject,
                Department: values.Department,
                Classname: values.Classname,
                Subtitle: values.Subtitle,
                Professor_id: user._id,
                Professor_name: user.name 
            }
            console.log(RequestBody);

            try {
                // call to backend url
                const response = await CreateClassroomApiCall(RequestBody);

                //  status of respose 
                if (response.status === 200) {
                    toast.success("Class Created Successfully");
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
            <Navbar activeLink='Create Classroom' />

            <Box md={{ Width: '100%' }} sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }}>
                <Container>
                    <form onSubmit={formik.handleSubmit}>
                        {/* <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">

                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                {" "}
                                Login For admin , teacher and student{" "}
                            </Typography>
                        </Box> */}

                        <Grid container spacing={2}>
                            {/* Sem */}
                            <Grid item xs={12} md={4} >
                                <TextField
                                    error={Boolean(formik.touched.Sem && formik.errors.Sem)}
                                    helperText={formik.touched.Sem && formik.errors.Sem}
                                    label="Sem"
                                    margin="normal"
                                    name="Sem"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Sem}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* Subject */}
                            <Grid item xs={12} md={4} >
                                <TextField
                                    error={Boolean(formik.touched.Subject && formik.errors.Subject)}
                                    helperText={formik.touched.Subject && formik.errors.Subject}
                                    label="Subject"
                                    margin="normal"
                                    name="Subject"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Subject}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* Batch */}
                            <Grid item xs={12} md={4} >
                                <TextField
                                    error={Boolean(formik.touched.Batch && formik.errors.Batch)}
                                    fullWidth
                                    helperText={formik.touched.Batch && formik.errors.Batch}
                                    label="Batch"
                                    margin="normal"
                                    name="Batch"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Batch}
                                    variant="outlined"
                                />
                            </Grid>

                            {/* Department */}
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 275 }}>
                                    <InputLabel id="demo-simple-select-helper-label" >Department </InputLabel>
                                    <Select
                                        error={Boolean(formik.touched.Department && formik.errors.Department)}
                                        helperText={formik.touched.Department && formik.errors.Department}
                                        labelId="demo-simple-select-helper-label"
                                        margin="normal"
                                        id="demo-simple-select-helper"
                                        label="Department"
                                        name="Department"
                                        fullWidth
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        // input={<OutlinedInput label="Tag" />}
                                        onChange={formik.handleChange}
                                    >
                                        {DepartmentSelectItemList.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}

                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText sx={{ color: "#D14343" }}>{formik.touched.Department && formik.errors.Department}</FormHelperText>
                                </FormControl>
                            </Grid>

                            {/* Classname */}
                            <Grid item xs={12} md={4} >
                                <TextField
                                    error={Boolean(formik.touched.Classname && formik.errors.Classname)}
                                    fullWidth
                                    helperText={formik.touched.Classname && formik.errors.Classname}
                                    label="Classname"
                                    margin="normal"
                                    name="Classname"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Classname}
                                    variant="outlined"
                                />
                            </Grid>

                            {/* Subtitle */}
                            <Grid item xs={12} md={4} >
                                <TextField
                                    error={Boolean(formik.touched.Subtitle && formik.errors.Subtitle)}
                                    fullWidth
                                    helperText={formik.touched.Subtitle && formik.errors.Subtitle}
                                    label="Subtitle"
                                    margin="normal"
                                    name="Subtitle"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Subtitle}
                                    variant="outlined"
                                />
                            </Grid>








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
                        </Grid>
                    </form>
                </Container>
            </Box>

        </>
    )
}

export default CreateClassroom;
