import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './dashboard/NavBar';
import Dashboard from './dashboard/Dashboard';
import AddEmployee from './dashboard/AddEmployee';
import EmployeeListPage from './dashboard/EmployeeListPage';
import VendorRegister from './components/vendor/VendorRegister';
import EmailVendorForm from './components/EmailVendorForm';
import EmailList from './components/EmailList';


const App = () => {
    return (
        <Router>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/employees" element={<EmployeeListPage />} />
                    <Route path="/VendorRegister" element={<VendorRegister />} />
                    <Route path="/EmailVendorForm" element={<EmailVendorForm />} />
                    <Route path="/EmailList" element={<EmailList />} />
                    
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
