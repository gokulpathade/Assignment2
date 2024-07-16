import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    margin: '0 8px',
    '&.active': {
        color: 'black', // Set active color to black
        fontWeight: 'bold',
    },
}));

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Vendors Management
                </Typography>
                <StyledNavLink to="/" exact>
                    <Button color="inherit">Dashboard</Button>
                </StyledNavLink>
                <StyledNavLink to="/add-employee">
                    <Button color="inherit">Add Employee</Button>
                </StyledNavLink>
                <StyledNavLink to="/employees">
                    <Button color="inherit">Employee List</Button>
                </StyledNavLink>
                <StyledNavLink to="/VendorRegister">
                    <Button color="inherit">Vendor</Button>
                </StyledNavLink>
                <StyledNavLink to="/EmailVendorForm">
                    <Button color="inherit">Email</Button>
                </StyledNavLink>
                <StyledNavLink to="/EmailList">
                    <Button color="inherit">Email List</Button>
                </StyledNavLink>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
