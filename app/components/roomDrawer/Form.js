"use client"
import dayjs from 'dayjs';
import { Col, DatePicker, Input, Form, Row, Select } from 'antd';
import useRooms from '@/app/hooks/useRooms';
import { StatusTag } from '@/app/utils/statusTags';

export default function EditRoomForm({ room, canEdit, dateFormat, newRoom, handleFormChange }) {
    const { rooms } = useRooms();
    const adultsOptions = [...Array(newRoom?.maxguest).keys()].map(num => num + 1);
    const childOptions = [...Array(newRoom?.maxguest).keys()].map(num => num);

    return (
        <Form
            layout="vertical"
            id="editRoomForm"
        >
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item label="Código">
                        <Input
                            value={room?.id}
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Data solicitação">
                        <Input
                            value={room?.solicitationdate}
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <Form.Item label="Acomodação" required>
                        <Select
                            disabled={!canEdit}
                            value={room?.roomid || newRoom?.roomid}
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
                        <Input value={`R$ ${room ? room?.daily : newRoom?.daily}`} disabled />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Hóspede responsável" required>
                        <Input
                            value={room?.nameguest || newRoom?.nameguest}
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
                            value={room?.emailguest || newRoom?.emailguest}
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
                            value={room?.contactguest || newRoom?.contactguest}
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
                            value={room?.adults || newRoom?.adults}
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
                            value={room?.children || newRoom?.children}
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
                            value={room?.adults + room?.children || newRoom?.adults + newRoom?.children}
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
                                onChange={(value) => handleFormChange({ target: { value, name: "roomtime" } })}
                                getPopupContainer={(trigger) => trigger.parentElement}
                            />
                        ) : (
                            <DatePicker.RangePicker
                                format={dateFormat}
                                value={[dayjs(room?.startdate), dayjs(room?.enddate)]}
                                disabled
                            />
                        )}
                    </Form.Item>
                </Col>

                <Col span={4}>
                    <Form.Item label="Total dias">
                        <Input
                            value={room ? (dayjs(room?.enddate).diff(dayjs(room?.startdate), 'day') + 1) : newRoom?.days}
                            disabled
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label="Valor total">
                        <Input
                            value={`R$ ${room ? room?.totalvalue : newRoom?.totalvalue}`}
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
                                {StatusTag(room?.statusid, room?.status)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Check-In">
                                <Input
                                    value={room?.checkin}
                                    disabled
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Check-Out">
                                <Input
                                    value={room?.checkout}
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
                            value={room?.observation || newRoom?.observation}
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