import { Box, Button, Checkbox, Container, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { UploadMaterial } from '../services/materialApis';



function Material(props) {

    let {userId} = useParams();

    console.log(userId);

    const today = new Date();

    const navigate = useNavigate();

    // form controller
    const formik = useFormik({

        // intial values
        initialValues: {
            title: '',
            description : ''
        },

        // To check enter value is vaild or not 
        validationSchema: Yup.object({   
            title: Yup.string().required("Title is required"),
        }),

        // for when click on submit button  
        onSubmit: async (values) => {
            console.log("Data");
            console.log(values);

            //Request Body To Pass Api
            const RequestBody = {
                userId : userId,//
                Title : values.title,
                Description : values.description,
            }

            try {
                // call to backend url
                const response = await UploadMaterial(RequestBody);

                //  status of respose 
                if (response.status === 200) {
                    toast.success("Material Upload Successfully");
                    console.log(response.data);
                    navigate('/');
                }

            } catch (err) {

                toast.error(err.message);
                console.log(err.message);
            }
        }
    });
    console.log("as");  
console.log(formik.isSubmitting);
    return (
        <>
        
            <Box md={{ Width: '100%' }} sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container>
                    
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4" > Material </Typography>
                        </Box>

                        <Grid container spacing={0}> 


                            <Grid item xs={12} md={0} >
                                {/* Title */}
                                <TextField
                                    error={Boolean(formik.touched.title && formik.errors.title)}
                                    // fullWidth
                                    helperText={formik.touched.title && formik.errors.title}
                                    label="Title"
                                    margin="normal"
                                    name="title"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    variant="outlined"
                                />
                            </Grid> 

                            <Grid item xs={12} md={0} >
                                {/* Description */}
                                <TextField
                                    error={Boolean(formik.touched.description && formik.errors.description)}
                                    fullWidth
                                    helperText={formik.touched.description && formik.errors.description}
                                    label="Description"
                                    margin="normal"
                                    name="description"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    variant="outlined"
                                />
                            </Grid> 
                            
                            



                            <Box sx={{ py: 2 }}>
                                {/* Submit btn */}
                                <Button color="primary" disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                                    Post
                                </Button>
                            </Box>
                        </Grid>
                    </form>
                    
    
                </Container>
            </Box>
            
        </>
    );
}

export default Material;