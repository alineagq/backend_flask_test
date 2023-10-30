import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    AlertTitle,
    InputAdornment,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const AddPerson = () => {
    const history = useHistory();
    const [focusedField, setFocusedField] = useState(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorResponse, setErrorResponse] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [successResponse, setSuccessResponse] = useState('');
    const [formData, setFormData] = useState({
        nome: "",
        rg: "",
        cpf: "",
        data_nascimento: "",
        data_admissao: "",
        funcao: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessResponse(data.message);
                setSuccessAlert(true);
                setTimeout(() => {
                    setSuccessAlert(false);
                    setSuccessResponse('');
                }, 5000);

                setFormData({
                    nome: '',
                    rg: '',
                    cpf: '',
                    data_nascimento: '',
                    data_admissao: '',
                    funcao: '',
                });
                history.push("/");
            })
            .catch((error) => {
                console.error("Error adding person:", error);
                setErrorResponse(error.message);
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                    setErrorResponse('');
                }, 5000);
            });
    };
    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
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
                    Criar Pessoa
                </Typography>
                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="RG"
                    name="rg"
                    value={formData.rg}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Data de Nascimento"
                    type="date"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    onFocus={() => handleFocus('data_nascimento')}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {focusedField === 'data_nascimento' ? null : null}
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Data de Admissão"
                    type="date"
                    name="data_admissao"
                    value={formData.data_admissao}
                    onChange={handleChange}
                    onFocus={() => handleFocus('data_admissao')}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {focusedField === 'data_admissao' ? null : null}
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Função"
                    name="funcao"
                    value={formData.funcao}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Criar
                </Button>
                <Link to="/">
                    <Button variant="outlined" color="primary">
                        Voltar
                    </Button>
                </Link>
            </Box>

            <Snackbar open={errorAlert} autoHideDuration={5000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorResponse}
                </Alert>
            </Snackbar>

            <Snackbar open={successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert(false)}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {successResponse}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddPerson;
