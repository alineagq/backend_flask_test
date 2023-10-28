import React, { useState } from 'react';
import {
    Box,
    Typography,
    Modal,
    TextField,
    Button,
    Snackbar,
    Alert,
    AlertTitle,
    InputAdornment,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const ModalCreate = ({ isOpen, handleClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        rg: '',
        cpf: '',
        data_nascimento: '',
        data_admissao: '',
        funcao: '',
    });

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorResponse, setErrorResponse] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [successResponse, setSuccessResponse] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreatePerson = () => {
        axios.post('http://localhost:5000/pessoas', formData)
            .then(response => {
                console.log(response.data);
                setSuccessResponse(response.data.message);
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

                handleClose();
            })
            .catch(error => {
                console.error('Error creating person: ', error);
                setErrorResponse(error.response ? error.response.data.message : 'An unexpected error occurred.');
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false);
                    setErrorResponse('');
                }, 10000);
                handleClose();
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
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-create-title"
                aria-describedby="modal-create-description"
            >
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
                    <Typography id="modal-create-title" variant="h6" component="h2">
                        Criar Pessoa
                    </Typography>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="RG"
                        name="rg"
                        value={formData.rg}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Data de Nascimento"
                        type="date"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleCreatePerson}>
                        Criar
                    </Button>
                </Box>
            </Modal>

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

export default ModalCreate;