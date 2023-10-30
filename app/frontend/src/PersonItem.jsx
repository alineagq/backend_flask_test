import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

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

const PersonItem = ({ person }) => {

  const handleDelete = () => {
    fetch(`http://localhost:5000/pessoas/${person.id_pessoa}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  return (
    <Stack marginBottom={2} key={person.id_pessoa}>
      <Demo>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={person.nome.split(' ')[0]}
            secondary={person.data_admissao ? new Date(person.data_admissao).toLocaleDateString('pt-BR') : null}
          />
          <IconButton
            edge="end"
            aria-label="details"
            component={Link}
            to={`/person/${person.id_pessoa}`}
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
          <IconButton
            edge="end"
            aria-label="edit"
            component={Link}
            to={`/person/${person.id_pessoa}/edit`}
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
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDelete}
            sx={{
              margin: '1px 1px',
              '&:hover': {
                backgroundColor: '#FFF',
              },
            }}
          >
            <DeleteIcon style={{ color: '#D83F31' }} />
          </IconButton>
        </ListItem>
      </Demo>
    </Stack>
  );
};

export default PersonItem;
