import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';

export default function EditReservation({ open, onClose }) {
    const dateFormat = 'DD-MM-YYYY';

    return (
        <Drawer
            title="Reserva 121"
            width={720}
            onClose={onClose}
            open={open}
            styles={{
                footer: {
                    padding: 22
                }
            }}
            footer={
                <Space>
                    <Button onClick={onClose}>Fechar</Button>
                    <Button type="primary" htmlType="submit" form="editReservationForm">
                        Salvar
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical" id="editReservationForm">
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item
                            label="Código"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Data reserva"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item
                            name="type"
                            label="Acomodação"
                            rules={[
                                {
                                    required: true,
                                    message: 'Quarto Sacada',
                                },
                            ]}
                        >
                            <Select placeholder="Quarto Sacada">
                                <Option value="Quarto Sacada">Quarto Sacada</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Hóspede responsável"
                            name='guest'
                            rules={[
                                {
                                    required: true,
                                    message: 'Preencha o nome do hóspede responsável pela reserva.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="E-mail"
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Preencha o e-mail correto do hóspede responsável pela reserva.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Contato"
                            name='contact'
                            rules={[
                                {
                                    required: true,
                                    message: 'Preencha o contato do hóspede responsável pela reserva.',
                                },
                            ]}
                        >
                            <InputNumber controls={false} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="type"
                            label="Adultos"
                            required
                        >
                            <Select placeholder="1" >
                                <Option value="1">1</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="type"
                            label="Crianças (abaixo de 12 anos)"
                        >
                            <Select placeholder="0">
                                <Option value="1">1</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Total hóspedes"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="dateTime"
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
                                style={{
                                    width: '100%',
                                }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item
                            label="Total dias"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Valor total"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="type"
                            label="Status"
                            required
                        >
                            <Select >
                                <Option value="Finalizada">Finalizada</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Observações"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}
