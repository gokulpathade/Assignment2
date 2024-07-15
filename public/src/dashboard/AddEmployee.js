import React from 'react';
import EmployeeForm from '../components/RegisterForm';

const AddEmployee = () => {
    return (
        <div>
            <EmployeeForm
                onSave={(employee) => {
                    console.log("Employee saved:", employee);
                }}
            />
        </div>
    );
};

export default AddEmployee;
