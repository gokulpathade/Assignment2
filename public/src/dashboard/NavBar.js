import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                vendors Management
                </Typography>
                <Button color="inherit" component={Link} to="/">Dashboard</Button>
                <Button color="inherit" component={Link} to="/add-employee">Add Employee</Button>
                <Button color="inherit" component={Link} to="/employees">Employee List</Button>
                <Button color="inherit" component={Link} to="/VendorRegister">Vendor</Button>
                <Button color="inherit" component={Link} to="/EmailVendorForm">Email</Button>
                <Button color="inherit" component={Link} to="/EmailList">EmailList</Button>
         
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
