import React, { useEffect, useState } from 'react';
import api from '../../config/ApiConfig';
import {
    Container,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert
} from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const VendorRegister = () => {
    const [vendors, setVendors] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);
    const [vendorToDelete, setVendorToDelete] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [emailSnackbarOpen, setEmailSnackbarOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { register: registerEmail, handleSubmit: handleEmailSubmit, reset: resetEmail } = useForm();
    const [selectedVendors, setSelectedVendors] = useState([]);
    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        const response = await api.get('/getallvender');
        setVendors(response.data);
    };

    const handleOpen = (vendor) => {
        setEditingVendor(vendor);
        reset(vendor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingVendor(null);
    };

    const onSubmit = async (data) => {
        if (editingVendor) {
            await api.put(`/updatevender/${editingVendor.id}`, data);
        } else {
            await api.post('/savevendor', data);
        }
        fetchVendors();
        handleClose();
        setSnackbarOpen(true);
    };

    const handleDeleteOpen = (vendor) => {
        setVendorToDelete(vendor);
        setConfirmOpen(true);
    };

    const handleDeleteClose = () => {
        setConfirmOpen(false);
        setVendorToDelete(null);
    };

    const handleDelete = async () => {
        if (vendorToDelete) {
            await api.delete(`/deletevender/${vendorToDelete.id}`);
            fetchVendors();
            handleDeleteClose();
        }
    };

    const handleEmailOpen = (vendor) => {
        setEditingVendor(vendor);
        resetEmail();
        setEmailOpen(true);
    };

    const handleEmailClose = () => {
        setEmailOpen(false);
        setEditingVendor(null);
    };

    const handleVendorChange = (vendorId) => {
        setSelectedVendors((prev) => {
            if (prev.includes(vendorId)) {
                return prev.filter((id) => id !== vendorId);
            } else {
                return [...prev, vendorId];
            }
        });
    };
    const onEmailSubmit = async () => {
        const emailData = selectedVendors.map(vendorId => ({
            vendor: { id: vendorId },
            user: { id: 1 } // Replace with actual user ID
        }));

        try {
            await api.post('/send', emailData);
            alert('Emails sent successfully!');
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Failed to send emails.');
        }
    };








    return (
        <Container>
            <Button style={{ marginTop: '10px' }} variant="contained" onClick={() => handleOpen(null)}>Add New Vendor</Button>
            <TableContainer style={{ marginTop: '10px' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UPI</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow key={vendor.id}>
                                <TableCell>{vendor.name}</TableCell>
                                <TableCell>{vendor.email}</TableCell>
                                <TableCell>{vendor.upi}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(vendor)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDeleteOpen(vendor)}>Delete</Button>
                                    <Button onClick={() => handleEmailOpen(vendor)}>Send Email</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Name" {...register('name')} fullWidth margin="normal" required />
                        <TextField label="Email" {...register('email')} fullWidth margin="normal" required />
                        <TextField label="UPI" {...register('upi')} fullWidth margin="normal" required />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this vendor?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={emailOpen} onClose={handleEmailClose}>
                <DialogTitle>Send Email to {editingVendor?.email}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
                        <TextField
                            label="Message"
                            {...registerEmail('message', { required: true })}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                        <DialogActions>
                            <Button onClick={handleEmailClose}>Cancel</Button>
                            <Button type="submit">Send</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Vendor saved successfully!
                </Alert>
            </Snackbar>

            <Snackbar open={emailSnackbarOpen} autoHideDuration={6000} onClose={() => setEmailSnackbarOpen(false)}>
                <Alert onClose={() => setEmailSnackbarOpen(false)} severity="success">
                    Email sent successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default VendorRegister;
