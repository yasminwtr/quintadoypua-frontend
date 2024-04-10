"use client"
import dayjs from 'dayjs';
import { Col, DatePicker, Input, InputNumber, Form, Row, Select } from 'antd';
import useRooms from '@/app/hooks/useRooms';
import { StatusTag } from '@/app/utils/statusTags';

export default function EditReservation({ reservation, handleFormChange, form, canEdit, dateFormat, newReservation }) {
    const { rooms } = useRooms();
    const adultsOptions = [...Array(newReservation?.maxGuest).keys()].map(num => num + 1);
    const childOptions = [...Array(newReservation?.maxGuest).keys()].map(num => num);

    return (
        <Form
            layout="vertical"
            id="editReservationForm"
            form={form}
            onValuesChange={handleFormChange}
        >
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item
                        label="Código"
                        name="id"
                    >
                        <Input
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="solicitationDate"
                        label="Data reserva"
                    >
                        <Input
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <Form.Item
                        label="Acomodação"
                        name="room"
                        rules={[
                            {
                                required: true,
                                message: 'Selecione uma acomodação.',
                            },
                        ]}
                        className='accomodation'
                    >
                        <Select disabled={!canEdit} labelInValue>
                            <Select.Option value='' title={{ daily: 0 }}>Selecione uma acomodação</Select.Option>
                            {rooms.map((room) => (
                                <Select.Option value={room.id} title={{ daily: room.daily || '', maxguest: room.maxguest || '' }} key={room.id}>{room.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Valor diária"
                    >
                        <Input value={`R$ ${reservation ? reservation?.daily : newReservation?.daily}`} disabled />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Hóspede responsável"
                        name='guest'
                        rules={[
                            {
                                required: true,
                                message: 'Preencha o nome.',
                            },
                        ]}
                    >
                        <Input disabled={!canEdit} placeholder='Nome completo' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="E-mail"
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Preencha o e-mail.',
                            },
                        ]}
                    >
                        <Input disabled={!canEdit} placeholder='email@email.com' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Contato"
                        name='contact'
                        rules={[
                            {
                                required: true,
                                message: 'Preencha o contato.',
                            },
                        ]}
                    >
                        <InputNumber
                            disabled={!canEdit}
                            controls={false}
                            placeholder='(00) 00000-0000'
                            style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item
                        name="adults"
                        label="Adultos"
                        required
                    >
                        <Select disabled={!canEdit}>
                            {adultsOptions.map(option => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="children"
                        label="Crianças (abaixo de 17 anos)"
                    >
                        <Select disabled={!canEdit}>
                            {childOptions.map(option => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Total hóspedes"
                    >
                        <Input
                            value={reservation ? (reservation?.adults + reservation?.children) : newReservation?.totalGuests}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="reservationTime"
                        label="Data estadia"
                        rules={[
                            {
                                required: true,
                                message: 'Preencha a data da estadia.',
                            },
                        ]}
                    >
                        <DatePicker.RangePicker
                            format={dateFormat}
                            disabledDate={(current) => {
                                return dayjs().subtract(1, 'day') >= current
                            }}
                            style={{
                                width: '100%',
                            }}
                            disabled={!canEdit}
                            getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>

                <Col span={4}>
                    <Form.Item
                        label="Total dias"
                    >
                        <Input
                            value={reservation ? (dayjs(reservation?.enddate).diff(dayjs(reservation?.startdate), 'day') + 1) : newReservation?.days}
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        label="Valor total"
                    >
                        <Input
                            value={`R$ ${reservation ? reservation?.totalvalue : (newReservation?.days * newReservation?.daily) || 0}`}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            {!canEdit && (
                <Row gutter={16}>
                    <Col span={12}>
                        <span>Status</span>
                        <Form.Item>
                            {StatusTag(reservation?.statusid)}
                        </Form.Item>
                    </Col>
                </Row>
            )}

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="observation"
                        label="Observações"
                    >
                        <Input.TextArea
                            disabled={!canEdit}
                            rows={4}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
