import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RoleSelectItemList = [
    'Student',
    'Teacher'
];

const DepartmentSelectItemList = [
    "Computer Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Chemical Engineering",
    "Mechanical Engineering "
];

function Registration() {

    const today = new Date();

    // form controller
    const formik = useFormik({

        // intial values
        initialValues: {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            dateofbirth: '',
            batch: '',
            department: '',
            role: ''
        },

        // To check enter value is vaild or not 
        validationSchema: Yup.object({
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
            role: Yup.string().required("Role is required"),
        }),

        // for when click on submit button  
        onSubmit: async (values) => {

            console.log(values);
            console.log("addes sucessfullly");
            // try {
            //     // call to backend url
            //     const response = await axios.post('/auth/signup', requestuser);

            //     //  status of respose 
            //     console.log(response.data.success);
            //     if (response.data.success == true) {
            //         toast.success("Registered Successfully");
            //         console.log(response.data.userId);
            //         Router
            //             .push('/auth/login')
            //             .catch(console.error);
            //     }
            //     if (response.data.success == false) {
            //         // let responseMsg = response.data.message ;
            //         toast.error("Already Registered with Email or Phone Number");
            //         Router
            //             .push('/auth/register')
            //             .catch(console.error);
            //     }

            // } catch (err) {
            //     toast.error(err);
            //     console.log(err);
            // }
        }
    });

    return (
        <>
            <Box md={{ Width: '100%' }} sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container>
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" > Add Student & Teacher </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2" > Add Student Or Teacher Details </Typography>
                        </Box>

                        <Grid container spacing={2}>
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
                                    label="Batch"
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

                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 275 }}>
                                    <InputLabel id="demo-simple-select-helper-label" >Role </InputLabel>
                                    <Select
                                        error={Boolean(formik.touched.role && formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                        labelId="demo-simple-select-helper-label"
                                        margin="normal"
                                        id="demo-simple-select-helper"
                                        label="Role"
                                        name="role"
                                        fullWidth
                                        onBlur={formik.handleBlur}
                                        variant="outlined"
                                        // input={<OutlinedInput label="Tag" />}
                                        onChange={formik.handleChange}
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
                                    <FormHelperText sx={{ color: "#D14343" }}>{formik.touched.role && formik.errors.role}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Box sx={{ py: 2 }}>
                                {/* Submit btn */}
                                <Button color="primary" disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                                    Sign Up Now
                                </Button>
                            </Box>



                        </Grid>
                    </form>

                </Container>
            </Box>
        </>
    );
}

export default Registration;
