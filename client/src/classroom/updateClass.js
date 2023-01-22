import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';

function UpdateClass(){
    const today = new Date();

    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    //from controller
    const formik = useFormik({
        //initialValues
        initialValues: {
            // Classcode: '',
            Sem: '',
            Batch: '',
            Subject: '',
            Department: '',
            Classname: '',
            Subtitle: '',
            Teacher: '',
            // ClassActiveStatus: '',
        },

        // To check enter value is vaild or not
        validationSchema: Yup.object({
            Sem: Yup.string().max(2).required('Semester Is Required'),
            Batch: Yup.string().max(4).required('Batch Is Required'),
            Subject: Yup.string().max(255).required('Subject Is Required'),
            Department: Yup.string().max(255).required('Department Is Required'),
            Classname: Yup.string().max(255).required('Classname'),
            Subtitle: Yup.string().max(255),
        }),

        //for when click on submit button
        onSubmit: async(values)=>{

            //Request Body To Pass Api
            const RequestBody = {
                Sem: parseInt(values.Sem),
                Batch: parseInt(values.Batch),
                Subject: values.Subject,
                Department: values.Department,
                Classname: values.Classname,
                Teacher: user._id,
                Subtitle: values.department,
            }

            try{
                //call to backend url
                const response = await axios.post('/classroom/createclass',RequestBody);

                // status of response
                if (response.status == 200) {
                    toast.success("ClassRoom Created Successfully");
                    console.log(response.data);
                    navigate('/');
                }

            }catch(err){
                toast.error(err.message);
                console.log(err.message);
            }

        }
    });

    return(
        <>
            <Box md={{Width: '100%'}} sx={{alignItems: 'center' ,display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" > Create ClassRoom </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2" > Create Your New Classroom </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} >
                                {/* Semester */}
                                <TextField
                                    error={Boolean(formik.touched.Sem && formik.errors.Sem)}
                                    fullWidth
                                    helperText={formik.touched.Sem && formik.errors.Sem}
                                    label="Semester"
                                    margin="normal"
                                    name="Sem"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Sem}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                {/* Batch */}
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
                            <Grid item xs={12} md={4} >
                                {/* Subject */}
                                <TextField
                                    error={Boolean(formik.touched.Subject && formik.errors.Subject)}
                                    fullWidth
                                    helperText={formik.touched.Subject && formik.errors.Subject}
                                    label="Subject"
                                    margin="normal"
                                    name="Subject"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Subject}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                {/* Department */}
                                <TextField
                                    error={Boolean(formik.touched.Department && formik.errors.Department)}
                                    fullWidth
                                    helperText={formik.touched.Department && formik.errors.Department}
                                    label="Department"
                                    margin="normal"
                                    name="Department"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.Department}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                {/* Classname */}
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
                            <Grid item xs={12} md={4} >
                                {/* Subtitle */}
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
                            <Box sx={{ py: 2 }}>
                                {/* Submit btn */}
                                <Button color="primary" disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                                    Create
                                </Button>
                            </Box>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </>
    );

}

export default UpdateClass;