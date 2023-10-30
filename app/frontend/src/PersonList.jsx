import React, { useState, useEffect } from "react";
import PersonItem from "./PersonItem";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pessoas")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        Lista de Pessoas
      </Typography>
      <Link to="/add">
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
        >
          <AddIcon />
          <Typography sx={{ ml: 1 }} variant="button" component="div">
            Adicionar
          </Typography>
        </IconButton>
      </Link>
      {people.map((person) => (
        <PersonItem key={person.id_pessoa} person={person} />
      ))}
    </div>
  );
};

export default PersonList;
