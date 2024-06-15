"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeRoles, setEmployeeRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchEmployees = async () => {
        try {
            const response = await api.get('/employee');
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    }

    const fetchEmployeeRoles = async () => {
        try {
            const response = await api.get('/employee/roles');
            setEmployeeRoles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
        fetchEmployeeRoles();
    }, []);

    return { employees, employeeRoles, loading, error };
};

export default useEmployees;