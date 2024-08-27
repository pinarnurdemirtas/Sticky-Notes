import React, { useState } from 'react';
import './notlar.css';
import { Input, notification, Button } from 'antd';  
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';  
import { addNote } from '../slices/notesSlice';  

const { TextArea } = Input;

const colornots = [
    "#ffc8ff",
    "#b3b9ff",
    "#adf4ff",
    "#b0ffd2",
    "#fdffba",
    "#a6cfff",
    "#ffbac8"
];



function YapiskanNotlar() {
    const [cards, setCards] = useState([]);
    const [colorIndex, setColorIndex] = useState(0);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        const { clientX: x, clientY: y } = event;
        const newCard = { 
            id: Date.now(),  
            top: y, 
            left: x, 
            content: "", 
            baslik: "",  
            color: colornots[colorIndex] 
        };
        setCards([...cards, newCard]);
        setColorIndex((colorIndex + 1) % colornots.length); 
    };

    const handleCardClickStop = (event) => {
        event.stopPropagation();
    };

    const handleCloseCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
    };

    const handleSaveCard = (id) => {
        const cardToSave = cards.find(card => card.id === id);

        if (cardToSave) {
            const savedNote = {
                id: cardToSave.id,
                content: cardToSave.content,
                baslik: cardToSave.baslik
            };
            dispatch(addNote(savedNote));
            notification.success({
                message: <strong style={{ fontSize: 15, paddingBottom: 4 }}>Notunuz Kayıt Edildi.</strong>,
                placement: 'topLeft',
                duration: 1
            });
        } else {
            console.log(`kart bulunamadı`);
        }
    };

    return (
        <div className="App" onClick={handleClick}>
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="card"
                    style={{ top: card.top, left: card.left, height: "340px", width:"250px", backgroundColor: card.color }}
                    onClick={handleCardClickStop}
                >
                    <CloseOutlined
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            fontSize: '32px',
                            color: "#130027",
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCloseCard(index);
                        }}
                    />

                    <Input 
                        placeholder="Başlık" 
                        value={card.baslik} 
                        onChange={(e) => {
                            const updatedCards = [...cards];
                            updatedCards[index].baslik = e.target.value;
                            setCards(updatedCards);
                        }}
                        style={{ marginTop: '30px', fontSize: '16px' }}
                    />

                    <TextArea
                        placeholder="Lütfen Notunuzu Yazınız.."
                        autoSize={{ maxRows: 7 }}
                        style={{ marginTop: '10px', fontSize: '15px' }}
                        value={card.content}
                        onChange={(e) => {
                            const updatedCards = [...cards];
                            updatedCards[index].content = e.target.value;
                            setCards(updatedCards);
                        }}
                    />

                    <Button 
                        type="primary" 
                        onClick={() => handleSaveCard(card.id)} 
                        style={{ marginTop: '10px' }}
                    >
                        Kaydet
                    </Button>
                </div>
            ))}
            <h2 style={{ color: "white" }}>Yapışkan Not Açmak İçin Tıklayın !</h2>
        </div>
    );
}

export default YapiskanNotlar;
