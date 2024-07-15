import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Box, Snackbar, Alert } from '@mui/material';
import ApiConfig from '../config/ApiConfig.js';

const RegisterForm = ({ employee, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: employee || {
            name: '',
            designation: '',
            ctc: 0,
            email: '',
        },
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            let response;
            if (employee) {
                response = await ApiConfig.put(`/updateuser/${employee.id}`, data);
            } else {
                response = await ApiConfig.post('/saveuser', data);
            }
            onSave(response.data);
            setSnackbarMessage('Employee saved successfully!');
            setSnackbarOpen(true);
            reset({
                name: '',
                designation: '',
                ctc: 0,
                email: '',
            });
        } catch (error) {
            setSnackbarMessage('There was an error saving the employee.');
            setSnackbarOpen(true);
            console.error("There was an error saving the employee!", error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, boxShadow: 1, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom>
                {employee ? 'Edit Employee' : 'Add New Employee'}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            {...register('name', { required: 'Name is required' })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Designation"
                            {...register('designation', { required: 'Designation is required' })}
                            error={!!errors.designation}
                            helperText={errors.designation?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="CTC"
                            type="number"
                            {...register('ctc', { required: 'CTC is required', min: 0 })}
                            error={!!errors.ctc}
                            helperText={errors.ctc?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('error') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegisterForm;
