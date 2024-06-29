import { Alert, Button, Drawer, Space } from 'antd';
import Form from '@/app/components/roomDrawer/Form'

export default function EditRoomForm({room, selectedRoom, newRoom, setNewRoom, open, onClose, addRoom, updateRoom, deleteRoom }) {
    const isRegistration = !selectedRoom?.id

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setNewRoom((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (isRegistration) {
            console.log('funcionario salvo!', newRoom);
            // addRoom(newRoom)
        } else {
            console.log('Funcionario editado!');
            updateRoom(newRoom, selectedRoom.id) 
        }
        onClose();
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave()
    };

    const handleDelete = () => {
        console.log('funcionario deletado!');
        deleteRoom(selectedRoom.id)
        onClose();
    };

    return (
        <Drawer
            title={isRegistration ? "Cadastrar Quarto" : `Quarto ${selectedRoom?.name}`}
            width={720}
            onClose={onClose}
            open={open}
            styles={{ footer: { padding: 22 } }}
            footer={
                <Space>
                    <Button onClick={e => handleSubmit(e)} type="primary">
                        Salvar
                    </Button>
                    {selectedRoom &&
                        <Button type="primary" danger onClick={()=> handleDelete()}>    
                            Excluir
                        </Button>
                    }
                </Space>
            }
        >
            <Form
                room = {selectedRoom}
                newRoom={newRoom}
                isRegistration={isRegistration}
                handleFormChange={handleFormChange}
            />
        </Drawer>
    );
}