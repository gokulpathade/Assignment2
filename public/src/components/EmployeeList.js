import React, { useEffect, useState } from 'react';
import api from '../config/ApiConfig';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const EmployeeList = ({ onEdit }) => {
    const [employees, setEmployees] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({
        id: null,
        name: '',
        designation: '',
        email: '',
        ctc: 0,
    });

    const fetchEmployees = async () => {
        const response = await api.get('/getalluser');
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async () => {
        await api.delete(`/deleteuser/${selectedEmployeeId}`);
        fetchEmployees();
        setDialogOpen(false);
    };

    const handleDialogOpen = (id) => {
        setSelectedEmployeeId(id);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedEmployeeId(null);
    };

    const handleEditDialogOpen = (employee) => {
        setEditedEmployee(employee);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setEditedEmployee({
            id: null,
            name: '',
            designation: '',
            email: '',
            ctc: 0,
        });
    };

    const handleEditEmployee = async () => {
        try {
            const response = await api.put(`/updateuser/${editedEmployee.id}`, editedEmployee);
            fetchEmployees();
            setEditDialogOpen(false);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    return (
        <>
            <List>
            <h2>
                Employee List
            </h2>
        
                {employees.map((employee) => (
                    <ListItem key={employee.id}>
                        <ListItemText primary={employee.name} secondary={`${employee.designation} - ${employee.email} - ${employee.ctc}`} />
                        <ListItemSecondaryAction>
                            <Button style={{
                                padding: '8px 16px', marginRight: '8px',
                            }} onClick={() => handleEditDialogOpen(employee)}  color="primary">
                                Edit
                            </Button> 
                            <Button   style={{
                                padding: '8px 16px', marginRight: '8px',
                            }} 
                            onClick={() => handleDialogOpen(employee.id)}  color="error">
                                Delete
                            </Button>
                            <Button  style={{
                                padding: '8px 16px', marginRight: '8px',
                            }} 
                             onClick={() => handleDialogOpen(employee.id)}  color="success">
                                EMAIL
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            {/* Delete Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        name="name"
                        value={editedEmployee.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Designation"
                        fullWidth
                        name="designation"
                        value={editedEmployee.designation}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        name="email"
                        value={editedEmployee.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="CTC"
                        type="number"
                        fullWidth
                        name="ctc"
                        value={editedEmployee.ctc}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditEmployee} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EmployeeList;
