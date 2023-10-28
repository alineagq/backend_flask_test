import React from 'react';
import {
  Box,
  Typography,
  Modal,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#FFF',
  border: '2px solid #F1F0E8',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const ModalDetails = ({ person, open, handleClose }) => (
  <Modal
    open={open === person.id_pessoa}
    onClose={handleClose}
    aria-labelledby={`modal-modal-title-${person.id_pessoa}`}
    aria-describedby={`modal-modal-description-1-${person.id_pessoa}`}
  >
    <Box sx={style}>
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={handleClose}
        aria-label="Close"
        sx={{ '&:hover': { color: '#D83F31' } }}
      >
        <CloseIcon
          padding={2}
          margin={2}
        />
      </IconButton>
      <Typography id={`modal-modal-title-${person.id_pessoa}`} variant="h6" component="h2">
        {person.nome}
      </Typography>
      <Typography id={`modal-modal-description-1-${person.id_pessoa}`} sx={{ mt: 2 }}>
        {person.data_admissao ? new Date(person.data_admissao).toLocaleDateString('pt-BR') : null}
      </Typography>
      <Typography id={`modal-modal-description-2-${person.id_pessoa}`} sx={{ mt: 2 }}>
        {person.rg}
      </Typography>
      <Typography id={`modal-modal-description-3-${person.id_pessoa}`} sx={{ mt: 2 }}>
        {person.cpf}
      </Typography>
      <Typography id={`modal-modal-description-4-${person.id_pessoa}`} sx={{ mt: 2 }}>
        {person.data_nascimento ? new Date(person.data_nascimento).toLocaleDateString('pt-BR') : null}
      </Typography>
      <Typography id={`modal-modal-description-5-${person.id_pessoa}`} sx={{ mt: 2 }}>
        {person.funcao}
      </Typography>
    </Box>
  </Modal>
);

export default ModalDetails;
