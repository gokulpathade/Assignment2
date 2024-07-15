import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../config/ApiConfig';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material';

const EmailList = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await api.get('/allemail'); // Update endpoint as necessary
                setEmails(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Email List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Recipient Email</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Vendor Name</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Date Sent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.map(email => (
                            <TableRow key={email.id}>
                                <TableCell>{email.id}</TableCell>
                                <TableCell>{email.recipientEmail}</TableCell>
                                <TableCell>{email.message}</TableCell>
                                <TableCell>{email.vendor.name}</TableCell> {/* Adjust if vendor is nested differently */}
                                <TableCell>{email.user.id}</TableCell> {/* Adjust if user is nested differently */}
                                <TableCell>{new Date(email.dateSent).toLocaleDateString()}</TableCell> {/* Adjust if you have a date field */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EmailList;
