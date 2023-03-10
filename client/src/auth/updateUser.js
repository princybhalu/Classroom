import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetOneUserApiCall } from '../services/userApis';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import { DepartmentSelectItemList } from '../model/DepartmentSelectItemList';
import { RoleSelectItemList } from '../model/RoleSelectItemList';
import { UpdateUserApiCall } from '../services/userApis';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";


function UpdateUser(props) {

    let { id } = useParams();
    const today = new Date();
    const navigate = useNavigate();


    const [user, setUser] = useState();

    GetOneUserApiCall(id).then((result) => { setUser(result); }).catch((err) => { console.log(err) });

    const validationSchema = Yup.object({
        userId: Yup.string().max(255).required('User Id  is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        name: Yup.string().max(255).required('First name is required'),
        dateofbirth: Yup.date().typeError('Enter a date').required('Date of birth is required').max(today),
        batch: Yup.string().required("Batch is required"),
        department: Yup.string().required("Department is required"),
        role: Yup.string().required("Role is required"),
    });


    return (<>
        <div>{!user && 'Loding...'}</div>

        {
            user && <>
                <Formik
                    initialValues={user && {
                        email: user.email,
                        userId: user.userId,
                        name: user.name,
                        dateofbirth: user.dob,
                        batch: user.batch,
                        department: user.department,
                        role: user.role,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        console.log("data");
                        console.log(values);

                        try {
                            const res = await UpdateUserApiCall(id, values);

                            if (res.status === 200) {
                                toast.success(res.data);
                                console.log(res.data);
                                navigate('/auth/allUser');
                            }

                        } catch (err) {

                            console.log(err.res.status);
                            toast.error(err.message);
                            console.log(err.message);
                        }



                    }}>
                    {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
                        <div>

                            <Form>
                                <Box sx={{ my: 3 }}>
                                    <Typography color="textPrimary" variant="h4" > Update User </Typography>
                                    <Typography color="textSecondary" gutterBottom variant="body2" > Edit Details </Typography>
                                </Box>

                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={4} >
                                        {/* User Id */}
                                        <TextField
                                            error={Boolean(touched.userId && errors.userId)}
                                            fullWidth
                                            helperText={touched.userId && errors.userId}
                                            label="User Id"
                                            margin="normal"
                                            name="userId"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values && values.userId}
                                            variant="outlined"
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} >
                                        {/* Name */}
                                        <TextField
                                            error={Boolean(touched.name && errors.name)}
                                            fullWidth
                                            helperText={touched.name && errors.name}
                                            label="Name"
                                            margin="normal"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values && values.name}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} >
                                        {/* Email Address */}
                                        <TextField
                                            error={Boolean(touched.email && errors.email)}
                                            fullWidth
                                            helperText={touched.email && errors.email}
                                            label="Email Address"
                                            margin="normal"
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="email"
                                            value={values && values.email}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} >
                                        {/* Date Of Birth */}
                                        <TextField
                                            error={Boolean(touched.dateofbirth && errors.dateofbirth)}
                                            fullWidth
                                            helperText={touched.dateofbirth && errors.dateofbirth}
                                            label="Date Of Birth"
                                            margin="normal"
                                            name="dateofbirth"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="date"
                                            value={values && values.dateofbirth}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} >
                                        {/* batch */}
                                        <TextField
                                            error={Boolean(touched.batch && errors.batch)}
                                            fullWidth
                                            helperText={touched.batch && errors.batch}
                                            label="Batch"
                                            margin="normal"
                                            name="batch"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values && values.batch}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl sx={{ m: 1, minWidth: 275 }}>
                                            <InputLabel id="demo-simple-select-helper-label" >Department </InputLabel>
                                            <Select
                                                error={Boolean(touched.department && errors.department)}
                                                helperText={touched.department && errors.department}
                                                labelId="demo-simple-select-helper-label"
                                                margin="normal"
                                                id="demo-simple-select-helper"
                                                label="Department"
                                                name="department"
                                                fullWidth
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                value={values.department}
                                                // input={<OutlinedInput label="Tag" />}
                                                onChange={handleChange}
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
                                            <FormHelperText sx={{ color: "#D14343" }}>{touched.department && errors.department}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl sx={{ m: 1, minWidth: 275 }}>
                                            <InputLabel id="demo-simple-select-helper-label" >Role </InputLabel>
                                            <Select
                                                error={Boolean(touched.role && errors.role)}
                                                helperText={touched.role && errors.role}
                                                labelId="demo-simple-select-helper-label"
                                                margin="normal"
                                                id="demo-simple-select-helper"
                                                label="Role"
                                                name="role"
                                                fullWidth
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                value={values.role}
                                                // input={<OutlinedInput label="Tag" />}
                                                onChange={handleChange}
                                            >
                                                {RoleSelectItemList.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}

                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText sx={{ color: "#D14343" }}>{touched.role && errors.role}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Box sx={{ py: 2 , marginRight : '5px' }}>
                                        {/* Submit btn */}
                                        <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{marginRight : '5px'}} >
                                            Save
                                        </Button>

                                    </Box>

                                    <Box sx={{ py: 2 }}>
                                        <Button onClick={() => { navigate('/auth/allUser') }} fullWidth size="large" variant="contained" color='error'>
                                            cancel
                                        </Button>
                                    </Box>




                                </Grid>
                            </Form>
                        </div>
                    )}
                </Formik>
            </>
        }


    </>)
};

export default UpdateUser;