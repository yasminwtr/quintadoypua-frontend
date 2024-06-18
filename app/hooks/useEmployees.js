"use client"
import { useState, useEffect } from 'react';
import api from '@/app/api/api';
import Password from 'antd/es/input/Password';
import { notification } from 'antd';

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeRoles, setEmployeeRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = notification.useNotification();

    const alertMessage = (type, message, description, placement) => {
        messageApi[type]({
            message: message,
            description: description,
            placement: placement ? placement : 'topRight',
        });
    };

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

    const addEmployee = async (employee, onClose) => {
        try {
            const response = await api.post("/employee/register", {
                email: employee.email,
                password: employee.password,
                name: employee.name,
                positionId: employee.positionid
            });

            alertMessage('success', 'Operação realizada com sucesso!', 'Funcionário cadastrado.');
            fetchEmployees();
            onClose();

        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
            console.log(error);
        }
    };

    const updateEmployee = async (employees , id) => {
        try {
            const response = await api.post(`/employee/edit/${id}`, {
                name: employees.name,
                email: employees.email,
                password: employees.password,
                positionId: employees.positionid
            });
            setLoading(false);
            alertMessage('success', 'Operação realizada com sucesso!', 'Dados atualizados.');
        } catch (error) {
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
            console.log(error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const response = await api.delete(`/employee/delete/${id}`);
            setLoading(false);
            alertMessage('success', 'Operação realizada com sucesso!', 'Usuário Deletado.');
        } catch (error) {
            console.error('Erro ao deletar dados:', error);
            setError(error);
            if (error.response) {
                alertMessage('error', `Ocorreu um erro ${error.response.status} ao realizar a operação.`, 'Por favor tente novamente ou contate o administrador do site.');
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchEmployeeRoles();
    }, []);

    return { employees, employeeRoles, loading, error, addEmployee, updateEmployee, deleteEmployee};
};

export default useEmployees;