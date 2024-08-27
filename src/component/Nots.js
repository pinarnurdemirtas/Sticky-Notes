import React, { useState } from 'react';
import { Card, List, Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote } from '../slices/notesSlice';

function Notlar() {
  const [selectedNote, setSelectedNote] = useState(null);
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.savedNotes);

  const handleItemClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      backgroundColor: '#f0f2f5' 
    }}>
      <Card
        title="YAPIŞKAN NOTLAR"
        style={{ width: 500, height: 450 }}
      >
        <List
          style={{ maxHeight: 350, overflow: "auto" }}
          size="large"
          bordered
          dataSource={notes} 
          renderItem={item => (
            <List.Item 
              onClick={() => handleItemClick(item)} 
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                />
              ]}
            >
              {item.baslik}
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={<div style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 20
        }}>{selectedNote ? selectedNote.baslik : ''}</div>}
        visible={!!selectedNote}
        onCancel={handleCloseModal}
        footer={null}
      >
        <p>{selectedNote ? selectedNote.content : ''}</p>
      </Modal>
    </div>
  );
}

export default Notlar;
