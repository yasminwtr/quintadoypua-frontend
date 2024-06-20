"use client"
import { Col, Input, Form, Row, Select, Checkbox } from 'antd';

export default function EditReservation({employee, employeeRoles, newEmployee, isRegistration, handleFormChange, selectedEmployee}) {
    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item
                        label="Código"
                    >
                        <Input
                            disabled
                            value={employee?.id} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Nome completo"
                        required
                    >
                        <Input
                            name='name'
                            value={employee?.name || newEmployee?.name}
                            onChange={(e) => handleFormChange(e)}
                        />

                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Cargo"
                        required
                    >
                        <Select
                            value={employee?.positionid || newEmployee?.positionid}
                            onChange={(value) => handleFormChange({ target: { value, name: "positionid" } })}
                        >
                            <Select.Option value=''>Selecione um cargo</Select.Option>
                            {employeeRoles.map(role =>
                                <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="E-mail"
                        required
                    >
                        <Input
                            name='email'
                            value={employee?.email || newEmployee?.email}
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Senha"
                        required
                    >
                        <Input
                            name='password'
                            onChange={(e) => handleFormChange(e)}
                        />
                    </Form.Item>
                </Col>

                {!isRegistration &&
                    <Col span={12}>
                        <Checkbox checked={employee?.active}>Ativo</Checkbox>
                    </Col>
                }
            </Row>
        </Form>
    );
}