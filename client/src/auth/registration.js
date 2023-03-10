import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, FormLabel , RadioGroup , FormControlLabel , Radio  } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { DepartmentSelectItemList } from '../model/DepartmentSelectItemList';
import { RoleSelectItemList } from '../model/RoleSelectItemList';
import Navbar from '../components/dashboard/navbar';
import React, { useState } from 'react';

function Registration() {

    const today = new Date();

    const navigate = useNavigate();

    // eslint-disable-next-line no-undef
    const [Enter1stData, SetEnter1stData] = useState(0);
    const [SelectedRole , SetSelectedRole] = useState("");

    const handleChangeOfRadioButtonOfSelectGame = (event) => {
        SetSelectedRole(event.target.value);
        SetEnter1stData(1);
    }

    // form controller
    const formik = useFormik({

        // intial values
        initialValues: {
            email: '',
            userId: '',
            firstName: '',
            lastName: '',
            dateofbirth: '',
            batch: '',
            department: ''
        },

        // To check enter value is vaild or not 
        validationSchema: Yup.object({
            userId: Yup.string().max(255).required('User Id  is required'),
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            firstName: Yup
                .string()
                .max(255)
                .required('First name is required'),
            lastName: Yup
                .string()
                .max(255)
                .required('Last name is required'),
            dateofbirth: Yup.date()
                .typeError('Enter a date')
                .required('Date of birth is required')
                .max(today),
            batch: Yup.string().required("Batch is required"),
            department: Yup.string().required("Department is required"),
            // role: Yup.string().required("Role is required"),
        }),

        // for when click on submit button  
        onSubmit: async (values) => {

            //Request Body To Pass Api
            const RequestBody = {
                userId: values.userId,
                dob: values.dateofbirth.toString(),
                role: SelectedRole,
                name: values.firstName + " " + values.lastName,
                email: values.email,
                batch: parseInt(values.batch),
                department: values.department,
                activestatus: true,
            }

            try {
                // call to backend url
                const response = await axios.post('/user/register', RequestBody);

                //  status of respose 
                if (response.status === 200) {
                    toast.success("Registered Successfully");
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
            <Navbar activeLink='Add User' />
            <Box md={{ Width: '100%' }} sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container>
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            {/* <Typography color="textPrimary" variant="h4" > Add Student & Teacher </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2" > Add Student Or Teacher Details </Typography> */}

                            <br />

                            <FormLabel id="demo-row-radio-buttons-group-label">Select Role</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="SelectRole"
                                onChange={handleChangeOfRadioButtonOfSelectGame} >
                                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                <FormControlLabel value="Professor" control={<Radio />} label="Professor" />
                            </RadioGroup>

                        </Box>

                        <Grid container spacing={2}>

                            {Enter1stData === 1 && <>

                                <Grid item xs={12} md={4} >
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
                                </Grid>

                                <Grid item xs={12} md={4} >
                                    {/* First Name */}
                                    <TextField
                                        error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                        fullWidth
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        label="First Name"
                                        margin="normal"
                                        name="firstName"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4} >
                                    {/* Last Name */}
                                    <TextField
                                        error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                        fullWidth
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        label="Last Name"
                                        margin="normal"
                                        name="lastName"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4} >
                                    {/* Email Address */}
                                    <TextField
                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email Address"
                                        margin="normal"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4} >
                                    {/* Date Of Birth */}
                                    <TextField
                                        error={Boolean(formik.touched.dateofbirth && formik.errors.dateofbirth)}
                                        fullWidth
                                        helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
                                        label="Date Of Birth"
                                        margin="normal"
                                        name="dateofbirth"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="date"
                                        value={formik.values.dateofbirth}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4} >
                                    {/* batch */}
                                    <TextField
                                        error={Boolean(formik.touched.batch && formik.errors.batch)}
                                        fullWidth
                                        helperText={formik.touched.batch && formik.errors.batch}
                                        label={SelectedRole === 'Student' ? "Batch" : "Experience" }
                                        margin="normal"
                                        name="batch"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.batch}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl sx={{ m: 1, minWidth: 275 }}>
                                        <InputLabel id="demo-simple-select-helper-label" >Department </InputLabel>
                                        <Select
                                            error={Boolean(formik.touched.department && formik.errors.department)}
                                            helperText={formik.touched.department && formik.errors.department}
                                            labelId="demo-simple-select-helper-label"
                                            margin="normal"
                                            id="demo-simple-select-helper"
                                            label="Department"
                                            name="department"
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
                                        <FormHelperText sx={{ color: "#D14343" }}>{formik.touched.department && formik.errors.department}</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Box sx={{ py: 2 }}>
                                        {/* Submit btn */}
                                        <Button color="primary" disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>

                            </>}

                        </Grid>
                    </form>

                </Container>
            </Box>
        </>
    );
}

export default Registration;
