"use client"
import { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { Table, Spin, Button } from 'antd';
import LateralMenu from "@/app/components/Sidebar/Sidebar"
import EditEmployee from '@/app/components/EmployeeDrawer/Drawer';
import { employeColumns } from '@/app/utils/tablesColumns';
import useEmployees from '@/app/hooks/useEmployees';

export default function EmployeeManagement() {
  const { employees, employeeRoles, loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployees()
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const initialStateNewEmployee = {
    name: '',
    email: '',
    password: '',
    positionid: '',
  };
  const [newEmployee, setNewEmployee] = useState(initialStateNewEmployee)

  const showDrawer = (employee) => {
    setSelectedEmployee(employee)
    setNewEmployee(initialStateNewEmployee)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const tableData = employees.map(employee => {
    return {
      key: employee.id,
      name: employee.name,
      position: employee.position,
      actions: <TbEdit size={20} color={'#29343F'} onClick={() => showDrawer(employee)} />
    };
  });

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        <span className="title">Gerenciamento de Funcionários</span>

        {loading ?
          <Spin fullscreen={true} />
          :
          <>
            <span className="title">Gerenciamento de Funcionários</span>

            <Button onClick={() => showDrawer(null)} type='primary' className='new'>Novo funcionário</Button>

            <Table
              className="table"
              columns={employeColumns}
              dataSource={tableData}
            />
          </>
        }

        <EditEmployee
          selectedEmployee={selectedEmployee}
          employeeRoles={employeeRoles}
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          open={open}
          onClose={onClose}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
        />
      </div>
    </main>
  );
}