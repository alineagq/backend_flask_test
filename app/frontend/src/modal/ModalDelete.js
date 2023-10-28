import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ModalDelete = ({ isOpen, handleClose, handleConfirmDelete }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: '300px' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Excluir Pessoa
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Deseja realmente excluir esta pessoa?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} color="primary" sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  border: '2px solid #F1F0E8',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default ModalDelete;
