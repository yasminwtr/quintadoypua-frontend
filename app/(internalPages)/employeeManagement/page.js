"use client"
import { useState } from 'react';
import { TbEditCircle } from "react-icons/tb";
import { Table } from 'antd';
import LateralMenu from "@/app/components/(internalPages)/LateralMenu"
import EditEmployee from '@/app/components/(internalPages)/EditEmployee';

export default function EmployeeManagement() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.reserva - b.reserva,
        multiple: 3,
      },
    },
    {
      title: 'NOME',
      dataIndex: 'name',
    },
    {
      title: 'CARGO',
      dataIndex: 'cargo',
    },
    {
      title: 'DATA ADMISSÃO',
      dataIndex: 'dataAdmissao',
      sorter: {
        compare: (a, b) => a.dataAdmissao - b.dataAdmissao,
        multiple: 3,
      },
    },
    {
      title: 'AÇÕES',
      dataIndex: 'acao',
    },
  ];
  const data = [
    {
      key: '1',
      id: '18',
      name: 'Yasmin Titow',
      cargo: 'Desenvolvedora Web',
      dataAdmissao: '18/02/2024',
      acao: <TbEditCircle size={20} color={'#29343F'} onClick={showDrawer} />,
    },
  ];

  return (
    <main className="main-internal">
      <LateralMenu />

      <div className="page">
        <span className="title">Gerenciamento de Funcionários</span>

        <Table className="table" columns={columns} dataSource={data} />

        <EditEmployee open={open} onClose={onClose} />
      </div>
    </main>
  );
}
