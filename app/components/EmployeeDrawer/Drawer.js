import { Alert, Button, Drawer, Space } from 'antd';
import Form from '@/app/components/EmployeeDrawer/Form'

export default function EditEmployee({ selectedEmployee, employeeRoles, newEmployee, setNewEmployee, open, onClose, addEmployee, updateEmployee, deleteEmployee }) {
    const isRegistration = !selectedEmployee?.id

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setNewEmployee((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (isRegistration) {
            console.log('funcionario salvo!');
            addEmployee(newEmployee)
        } else {
            newEmployee.name = newEmployee.name == "" ? selectedEmployee.name : newEmployee.name;
            newEmployee.password = newEmployee.password == "" ? selectedEmployee.password : newEmployee.password;
            newEmployee.email = newEmployee.email == "" ? selectedEmployee.email : newEmployee.email;
            newEmployee.positionid = newEmployee.positionid == "" ? selectedEmployee.positionid : newEmployee.positionid;
            console.log('Funcionario editado!');
            updateEmployee(newEmployee, selectedEmployee.id)
        }
        onClose();
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave()
    };

    const handleDelete = () => {
        console.log('funcionario deletado!');
        deleteEmployee(selectedEmployee.id)
        onClose();
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
                    <Button onClick={e => handleSubmit(e)} type="primary">
                        Salvar
                    </Button>
                    {selectedEmployee &&
                        <Button type="primary" danger onClick={()=> handleDelete()}>
                            Excluir
                        </Button>
                    }
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