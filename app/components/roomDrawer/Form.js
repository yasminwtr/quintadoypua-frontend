"use client"
import { Col, Input, Form, Row, Checkbox } from 'antd';

export default function EditRoomForm({ room, newRoom, isRegistration, handleFormChange }) {
    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item
                        label="Id"
                    >
                        <Input
                            disabled
                            value={room?.id} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Nome do Quarto"
                        required
                    >
                        <Input
                            name='name'
                            defaultValue={room?.name || newRoom?.name}
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="URL Link"
                        required
                    >
                        <Input
                            url='url'
                            defaultValue={room?.url || newRoom?.url}
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>
            </Row>       
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Valor da diária"
                            required
                        >
                            <Input
                                daily='daily'
                                defaultValue={room?.daily || newRoom?.daily}
                                onChange={(e) => handleFormChange(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Descrição"
                            required
                        >
                            <Input
                                description='description'
                                defaultValue={room?.description || newRoom?.description}
                                onChange={(e) => handleFormChange(e)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Quantidade Pessoas"
                            required
                        >
                            <Input
                                maxguest='maxguest'
                                defaultValue={room?.maxguest || newRoom?.maxguest}
                                onChange={(e) => handleFormChange(e)}
                            />
                        </Form.Item>
                    </Col>

                </Row>

            {/* {!isRegistration &&
                <Col span={12}>
                    <Checkbox checked={room?.active}>checkIn</Checkbox>
                    <Checkbox checked={room?.active}>checkOut</Checkbox>
                </Col>
            } */}
        </Form>
    );
}