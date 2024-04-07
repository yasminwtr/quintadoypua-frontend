import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';

export default function EditEmployee({ open, onClose }) {
    return (
        <Drawer
            title="Funcionário Yasmin Titow de Souza"
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
                    <Button onClick={onClose} type="primary">
                        Salvar
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item
                            // name="name"
                            label="Código"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Data admissão"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Nome completo"
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="E-mail"
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item
                            name="type"
                            label="Cargo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Gerente',
                                },
                            ]}
                        >
                            <Select placeholder="Gerente">
                                <Option value="Gerente">Gerente</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}
