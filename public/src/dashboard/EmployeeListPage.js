import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';

const EmployeeListPage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <div>
            <EmployeeList onEdit={setSelectedEmployee} />
        </div>
    );
};

export default EmployeeListPage;
