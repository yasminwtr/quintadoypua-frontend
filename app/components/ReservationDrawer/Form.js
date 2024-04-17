"use client"
import dayjs from 'dayjs';
import { Col, DatePicker, Input, Form, Row, Select } from 'antd';
import useRooms from '@/app/hooks/useRooms';
import { StatusTag } from '@/app/utils/statusTags';

export default function EditReservation({ reservation, canEdit, dateFormat, newReservation, handleFormChange }) {
    const { rooms } = useRooms();
    const adultsOptions = [...Array(newReservation?.maxguest).keys()].map(num => num + 1);
    const childOptions = [...Array(newReservation?.maxguest).keys()].map(num => num);

    return (
        <Form
            layout="vertical"
            id="editReservationForm"
        >
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item label="Código">
                        <Input
                            value={reservation?.id}
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Data solicitação">
                        <Input
                            value={reservation?.solicitationdate}
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <Form.Item label="Acomodação" required>
                        <Select
                            disabled={!canEdit}
                            value={reservation?.roomid || newReservation?.roomid}
                            name='room'
                            onChange={(value, option) => handleFormChange(value, option)}
                        >
                            <Select.Option value='' daily={0} maxguest={1}>Selecione uma acomodação</Select.Option>
                            {rooms.map((room) => (
                                <Select.Option value={room.id} daily={room.daily} maxguest={room.maxguest} key={room.id}>{room.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label="Valor diária">
                        <Input value={`R$ ${reservation ? reservation?.daily : newReservation?.daily}`} disabled />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Hóspede responsável" required>
                        <Input
                            value={reservation?.nameguest || newReservation?.nameguest}
                            disabled={!canEdit}
                            placeholder='Nome completo'
                            name='nameguest'
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="E-mail" required>
                        <Input
                            value={reservation?.emailguest || newReservation?.emailguest}
                            disabled={!canEdit}
                            placeholder='email@email.com'
                            name='emailguest'
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Contato" required>
                        <Input
                            value={reservation?.contactguest || newReservation?.contactguest}
                            disabled={!canEdit}
                            placeholder='(00) 00000-0000'
                            style={{ width: '100%' }}
                            name='contactguest'
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item label="Adultos" required>
                        <Select
                            disabled={!canEdit}
                            value={reservation?.adults || newReservation?.adults}
                            onChange={(value) => handleFormChange({ target: { value, name: "adults" } })}
                        >
                            {adultsOptions.map(option => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label="Crianças (abaixo de 17 anos)">
                        <Select
                            disabled={!canEdit}
                            value={reservation?.children || newReservation?.children}
                            onChange={(value) => handleFormChange({ target: { value, name: "children" } })}
                        >
                            {childOptions.map(option => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item label="Total hóspedes">
                        <Input
                            value={reservation?.adults + reservation?.children || newReservation?.adults + newReservation?.children}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={10}>
                    <Form.Item label="Data estadia">
                        {canEdit ? (
                            <DatePicker.RangePicker
                                format={dateFormat}
                                disabledDate={(current) => { return dayjs().subtract(1, 'day') >= current }}
                                onChange={(value) => handleFormChange({ target: { value, name: "reservationtime" } })}
                                getPopupContainer={(trigger) => trigger.parentElement}
                            />
                        ) : (
                            <DatePicker.RangePicker
                                format={dateFormat}
                                value={[dayjs(reservation?.startdate), dayjs(reservation?.enddate)]}
                                disabled
                            />
                        )}
                    </Form.Item>
                </Col>

                <Col span={4}>
                    <Form.Item label="Total dias">
                        <Input
                            value={reservation ? (dayjs(reservation?.enddate).diff(dayjs(reservation?.startdate), 'day') + 1) : newReservation?.days}
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label="Valor total">
                        <Input
                            value={`R$ ${reservation ? reservation?.totalvalue : newReservation?.totalvalue}`}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            {!canEdit && (
                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span>Status</span>
                            <Form.Item>
                                {StatusTag(reservation?.statusid, reservation?.status)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Check-In">
                                <Input
                                    value={reservation?.checkin}
                                    disabled
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Check-Out">
                                <Input
                                    value={reservation?.checkout}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Observações">
                        <Input.TextArea
                            value={reservation?.observation || newReservation?.observation}
                            name='observation'
                            onChange={(e) => handleFormChange(e)}
                            disabled={!canEdit}
                            rows={4}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
