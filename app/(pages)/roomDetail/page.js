"use client"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Navbar from '@/app/components/Navbar/Navbar'
import styles from "@/app/styles/room.module.css";
import { Col, DatePicker, Input, Form, Row, Select, Spin } from 'antd';
import useRooms from '@/app/hooks/useRooms';
import useClient from '@/app/hooks/useClient';
import useReservations from '@/app/hooks/useReservations';

export default function roomDetail() {
    const { room, fetchRoomById, loading } = useRooms();
    const { user, getUser } = useClient();
    const { addReservation } = useReservations();
    const dateFormat = 'DD/MM/YYYY';
    const adultsOptions = [...Array(room?.maxguest).keys()].map(num => num + 1);
    const childOptions = [...Array(room?.maxguest).keys()].map(num => num);
    const initialStateNewReservation = {
        clientid: user?.id,
        roomid: room?.id,
        daily: 0,
        nameguest: user?.name,
        emailguest: user?.email,
        contactguest: '',
        adults: 1,
        children: 0,
        reservationtime: null,
        days: 0,
        totalvalue: 0,
        observation: '',
        internalreservation: false
    };
    const [newReservation, setNewReservation] = useState(initialStateNewReservation)

    useEffect(() => {
        fetchRoomById(1);
        getUser()
    }, []);

    useEffect(() => {
        if (room && user) {
            setNewReservation(prevState => ({
                ...prevState,
                roomid: room.id,
                clientid: user.id,
                nameguest: user.name,
                emailguest: user.email,
            }));
        }
    }, [room, user]);

    const handleFormChange = (e, option) => {
        if (!option) {
            const { name, value } = e.target;
            let daysValue = newReservation?.days

            if (name === 'reservationtime') {
                daysValue = !value ? 0 : (dayjs(value[1]?.$d).diff(dayjs(value[0]?.$d), 'day') + 1)
            }

            setNewReservation((prevData) => ({
                ...prevData,
                [name]: value,
                days: daysValue,
                totalvalue: daysValue * room?.daily
            }));

        } else {
            setNewReservation((prevData) => ({
                ...prevData,
                totalvalue: prevData.days * room?.daily
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addReservation(newReservation)
        setNewReservation(initialStateNewReservation)
    };

    return (
        <main>
            <Navbar />

            {loading ?
                <Spin fullscreen={true} />
                :
                <>
                    <div className={styles.room}>
                        <div className={styles.image_container}>
                            <div className={styles.image}>
                                <div className={styles.room_title}>
                                    <span>{room?.name}</span>
                                    <span>Estrada Ipua, 6 - Laguna, SC, 88790-000</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.container}>
                            <div className={styles.info}>
                                <span className={styles.title}>Informações</span>
                                <span className={styles.text}>{room?.description}</span>

                                <span className={styles.title}>Valor diária</span>
                                <span className={styles.text}>R$ {room?.daily}</span>

                                <span className={styles.title}>Check-In</span>
                                <span className={styles.text}>{room?.checkin}</span>

                                <span className={styles.title}>Check-Out</span>
                                <span className={styles.text}>{room?.checkout}</span>
                            </div>

                            <div className={styles.form}>
                                <span className={styles.title_form}>Marque já a sua estadia!</span>

                                <Form
                                    layout="vertical"
                                    id="reservationForm"
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="Data estadia" required>
                                                <DatePicker.RangePicker
                                                    format={dateFormat}
                                                    disabledDate={(current) => { return dayjs().subtract(1, 'day') >= current }}
                                                    getPopupContainer={(trigger) => trigger.parentElement}
                                                    onChange={(value) => handleFormChange({ target: { value, name: "reservationtime" } })}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={5}>
                                            <Form.Item label="Total dias">
                                                <Input
                                                    value={newReservation?.days}
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={7}>
                                            <Form.Item label="Valor total">
                                                <Input
                                                    value={`R$ ${newReservation?.totalvalue}`}
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Form.Item label="Adultos" required>
                                                <Select
                                                    value={newReservation?.adults}
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

                                        <Col span={12}>
                                            <Form.Item label="Crianças (abaixo de 17 anos)">
                                                <Select
                                                    value={newReservation?.children}
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
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item label="Contato" required>
                                                <Input
                                                    placeholder='(00) 00000-0000'
                                                    style={{ width: '100%' }}
                                                    name='contactguest'
                                                    onChange={(e) => handleFormChange(e)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item label="Observações">
                                                <Input.TextArea
                                                    name='observation'
                                                    rows={4}
                                                    onChange={(e) => handleFormChange(e)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>

                                <button onClick={e => handleSubmit(e)} type='submit' form="reservationForm">Reservar</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </main>
    );
}