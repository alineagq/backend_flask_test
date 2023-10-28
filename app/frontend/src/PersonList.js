import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import ModalDetails from './modal/ModalDetails';
import ModalCreate from './modal/ModalCreate';
import ModalDelete from './modal/ModalDelete';
import ModalEdit from './modal/ModalEdit';


const Demo = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: 'background-color 0.3s ease-out',
  ":hover": {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F1F0EF',
  },
}));

const PersonListItem = ({ person, handleOpen, handleClose, open, handleDeletePerson, handleOpenEditModal, isEditModalOpen, handleCloseEditModal }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    setDeleteModalOpen(false); // Close the delete modal
    try {
      await handleDeletePerson(person.id_pessoa);
    } catch (error) {
      console.error('Error deleting person: ', error);
    }
  };

  return (
    <Stack marginBottom={2} key={person.id_pessoa}>
      <Demo>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={person.nome}
            secondary={person.data_admissao ? new Date(person.data_admissao).toLocaleDateString('pt-BR') : null}
          />
          <IconButton
            edge="end"
            aria-label="details"
            onClick={() => handleOpen(person.id_pessoa)}
            sx={{
              margin: '1px 1px',
              '&:hover': {
                color: '#1F1717',
                backgroundColor: '#FFF',
                boxShadow: '0px 0px 0px 2px #1F1717'
              },
            }}
          >
            <ArticleIcon></ArticleIcon>
          </IconButton>
          <ModalDetails person={person} open={open} handleClose={handleClose} />
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleOpenEditModal(person.id_pessoa)}
            sx={{
              margin: '1px 1px',
              '&:hover': {
                color: '#0174BE',
                backgroundColor: '#FFF',
                boxShadow: '0px 0px 0px 2px #0174BE'
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <ModalEdit isEditModalOpen={isEditModalOpen} handleClose={handleCloseEditModal} id={person.id_pessoa}/>
          <IconButton
            edge="end"
            aria-label="delete"
            sx={{
              margin: '1px 1px',
              '&:hover': {
                backgroundColor: '#FFF',
              },
            }}
            onClick={() => setDeleteModalOpen(true)}
          >
            <DeleteIcon style={{ color: '#D83F31' }} />
          </IconButton>
        </ListItem>
      </Demo>
      <ModalDelete
        isOpen={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleConfirmDelete={handleDelete}
      />
    </Stack>
  );
};


const InteractiveList = () => {
  const [people, setPeople] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleOpen = (id) => setOpenModalId(id);
  const handleClose = () => setOpenModalId(null);

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseCreateModal = () => setCreateModalOpen(false);

  const handleOpenEditModal = (id) => setEditModalOpen(id);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleDeletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pessoas/${id}`);
      setPeople((prevPeople) => prevPeople.filter((p) => p.id_pessoa !== id));
    } catch (error) {
      console.error('Error deleting person: ', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/pessoas')
      .then(response => setPeople(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
          Lista de Pessoas
        </Typography>
        <IconButton
          edge="end"
          aria-label="add"
          sx={{
            margin: '1px 1px',
            color: '#A2C579',
            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
          onClick={handleOpenCreateModal}
        >
          <AddIcon />
        </IconButton>
        <List>
          {people.map((person) => (
            <PersonListItem
              key={person.id_pessoa}
              person={person}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={openModalId}
              handleDeletePerson={handleDeletePerson}
              handleOpenEditModal={handleOpenEditModal}
              handleCloseEditModal={handleCloseEditModal}
              setPeople={setPeople}
            />
          ))}
        </List>
        <ModalCreate isOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} />
      </Grid>
    </Box>
  );
};

export default InteractiveList;
