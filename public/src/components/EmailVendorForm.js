import React, { useState, useEffect } from 'react';
import api from '../config/ApiConfig';
import {
    Container,
    Typography,
    Checkbox,
    FormControlLabel,
    Button,
    TextField,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';

const EmailVendorForm = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch vendors from your backend
        const fetchVendors = async () => {
            const response = await api.get('/getallvender'); // Update endpoint as necessary
            setVendors(response.data);
        };
        
        fetchVendors();
    }, []);

    const handleVendorChange = (vendorId) => {
        setSelectedVendors((prev) => {
            if (prev.includes(vendorId)) {
                return prev.filter((id) => id !== vendorId);
            } else {
                return [...prev, vendorId];
            }
        });
    };

    const handleSendEmail = async () => {
        const emailData = selectedVendors.map(vendorId => ({
            vendor: { id: vendorId },
            user: { id: 1 } // Replace with actual user ID
        }));

        try {
            await api.post('/send', emailData);
            setSuccessMessage('Emails sent successfully!');
            resetForm(); // Reset form fields after success
        } catch (error) {
            console.error('Error sending emails:', error);
            setErrorMessage('Failed to send emails.');
        }
    };

    const resetForm = () => {
        setSelectedVendors([]);
        setMessage('');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Send Email to Vendors
            </Typography>
            {/* <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            /> */}
            <Grid container spacing={2} style={{ marginTop: '16px' }}>
                {vendors.map(vendor => (
                    <Grid item xs={12} key={vendor.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedVendors.includes(vendor.id)}
                                    onChange={() => handleVendorChange(vendor.id)}
                                />
                            }
                            label={`${vendor.name} (${vendor.email})`}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
                style={{ marginTop: '16px' }}
            >
                Send Email
            </Button>

            {/* Snackbar for success or error messages */}
            <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                <Alert onClose={() => setSuccessMessage('')} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EmailVendorForm;
