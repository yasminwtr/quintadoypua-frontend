import { Button, Drawer, Space } from 'antd';
import Form from '@/app/components/EmployeeDrawer/Form'

export default function EditEmployee({ selectedEmployee, employeeRoles, newEmployee, setNewEmployee, open, onClose }) {
    const isRegistration = !selectedEmployee?.id

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setNewEmployee((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Drawer
            title={isRegistration ? "Cadastrar Funcionário" : `Funcionário ${selectedEmployee?.name}`}
            width={720}
            onClose={onClose}
            open={open}
            styles={{ footer: { padding: 22 } }}
            footer={
                <Space>
                    <Button onClick={onClose} type="primary">
                        Salvar
                    </Button>
                </Space>
            }
        >
            <Form
                employee={selectedEmployee}
                employeeRoles={employeeRoles}
                newEmployee={newEmployee}
                isRegistration={isRegistration}
                handleFormChange={handleFormChange}
            />
        </Drawer>
    );
}
