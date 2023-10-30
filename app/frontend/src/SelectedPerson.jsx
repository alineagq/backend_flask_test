import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const SelectedPerson = () => {
  const { id } = useParams();
  const history = useHistory();
  const [person, setPerson] = useState({
    nome: "",
    rg: "",
    cpf: "",
    data_nascimento: "",
    data_admissao: "",
    funcao: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/pessoas/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setPerson({
            id_pessoa: data.id_pessoa,
            nome: data.nome,
            rg: data.rg,
            cpf: data.cpf,
            data_nascimento: formatDate(data.data_nascimento),
            data_admissao: formatDate(data.data_admissao),
            funcao: data.funcao,
          });
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching person data:", error);
        });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString).toLocaleDateString('pt-BR');
    return date;
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/pessoas/${person.id_pessoa}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push('/');
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  return (
    <div>
      <Box
        sx={{
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
        }}
      >
        <Link to="/">
          <IconButton
            style={{ position: 'absolute', top: 0, right: 0 }}
            aria-label="Close"
            sx={{ '&:hover': { color: '#D83F31' } }}
          >
            <CloseIcon padding={2} margin={2} />
          </IconButton>
        </Link>
        <Typography variant="h6" component="h2">
          Registro de {person.nome.split(" ")[0]}
        </Typography>
        <p>Nome: {person.nome}</p>
        <p>RG: {person.rg}</p>
        <p>CPF: {person.cpf}</p>
        <p>Data de Nascimento: {person.data_nascimento}</p>
        <p>Data de Admissão: {person.data_admissao}</p>
        <p>Função: {person.funcao}</p>
        <Link to={`/person/${person.id_pessoa}/edit`}>
          <Button variant="contained" color="primary">Editar</Button>
        </Link>
        <Link to="/"><Button variant="outlined" color="primary">Voltar</Button></Link>
        <Button onClick={handleDelete} variant="outlined" color="secondary">Excluir</Button>
      </Box>
    </div>
  );
};

export default SelectedPerson;
