import dayjs from 'dayjs';

export const reservationColumns = [
    {
        title: 'RESERVA',
        dataIndex: 'key',
        sorter: {
            compare: (a, b) => a.key - b.key,
            multiple: 3,
        },
    },
    {
        title: 'INÍCIO ESTADIA',
        dataIndex: 'startDate',
        sorter: {
            compare: (a, b) => dayjs(a.startDate, "DD/MM/YYYY").unix() - dayjs(b.startDate, "DD/MM/YYYY").unix(),
            multiple: 3,
        },
    },
    {
        title: 'FIM ESTADIA',
        dataIndex: 'endDate',
        sorter: {
            compare: (a, b) => dayjs(a.endDate, "DD/MM/YYYY").unix() - dayjs(b.endDate, "DD/MM/YYYY").unix(),
            multiple: 3,
        },
    },
    {
        title: 'ACOMODAÇÃO',
        dataIndex: 'room',
    },
    {
        title: 'HÓSPEDE',
        dataIndex: 'nameGuest',
    },
    {
        title: 'SOLICITADA',
        dataIndex: 'solicitationDate',
        sorter: {
            compare: (a, b) => dayjs(a.solicitationDate, "DD/MM/YYYY").unix() - dayjs(b.solicitationDate, "DD/MM/YYYY").unix(),
            multiple: 3,
        },
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
    },
    {
        title: 'AÇÕES',
        dataIndex: 'actions',
    },
];

export const employeColumns = [
    {
        title: 'ID',
        dataIndex: 'key',
        sorter: {
            compare: (a, b) => a.key - b.key,
            multiple: 3,
        },
    },
    {
        title: 'NOME',
        dataIndex: 'name',
    },
    {
        title: 'CARGO',
        dataIndex: 'position',
    },
    {
        title: 'AÇÕES',
        dataIndex: 'actions',
    },
];