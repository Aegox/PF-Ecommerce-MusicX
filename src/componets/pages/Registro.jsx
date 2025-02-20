import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Image, Badge, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from '../../css/registro.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { ValidoRegistro } from '../../utils/validaciones';
import { errorAction, registraAction, registraGoogleAction } from '../../redux/actions/authAction';
import icGoogle from '../images/ic_google.svg';

const INIT_STATE = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    rclave: ''
};

const Registro = () => {
    //ALL
    const [registro, setRegistro] = useState(INIT_STATE);
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { errorAuth } = useSelector(state => state.auth);

    useEffect(() => {
        return () => {
            if (errorAuth) {
                dispatch(errorAction(''));
            }
        };
    }, [errorAuth, dispatch]);

    const onChangeGoogle = async (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(registraGoogleAction(() => setLoading(false)));
    };

    const onChange = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        });

        setErrores(ValidoRegistro({
            ...registro,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (errorAuth) {
            dispatch(errorAction(''));
        }

        if (errores.valido) {
            setLoading(true);
            dispatch(registraAction(registro, () => setLoading(false)));
        }
    };

    return (
        <Container className='my-4'>
            <Card className={`${s.registrocard} m-auto border-0`}>
                <Card.Body className='d-grid'>
                    <div className='text-center'>
                        <Image className='btn-primary' src={icLogo} width='100px' />
                    </div>
                    <Card.Title className='text-center my-3 text-white'>Registrarme</Card.Title>
                    <Form onSubmit={onSubmit} className='d-grid'>
                        {
                            loading ?
                                <>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="dark" />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="dark" />
                                    </Placeholder>
                                </>
                                :
                                <>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Nombre'>
                                        <Form.Control name='nombre' type='text' placeholder='Juan' onChange={onChange} value={registro.nombre} isInvalid={!!errores.nombre} />
                                        <Form.Control.Feedback type={'invalid'}>{errores.nombre}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Apellido'>
                                        <Form.Control name='apellido' type='text' placeholder='Perez' onChange={onChange} value={registro.apellido} isInvalid={!!errores.apellido} />
                                        <Form.Control.Feedback type='invalid'>{errores.apellido}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Correo Electronico'>
                                        <Form.Control name='correo' type='email' placeholder='micorreo@example.com' onChange={onChange} value={registro.correo} isInvalid={!!errores.correo} />
                                        <Form.Control.Feedback type='invalid'>{errores.correo}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingPassword' label='Contraseña'>
                                        <Form.Control name='clave' type='password' placeholder='Contraseña' onChange={onChange} value={registro.clave} isInvalid={!!errores.clave} />
                                        <Form.Control.Feedback type='invalid'>{errores.clave}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingPassword' label='Repetir Contraseña'>
                                        <Form.Control name='rclave' type='password' placeholder='Repetir Contraseña' onChange={onChange} value={registro.rclave} isInvalid={!!errores.rclave} />
                                        <Form.Control.Feedback type='invalid'>{errores.rclave}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <Button className='mb-3' variant='dark' type='submit' onClick={onChange}>
                                        Registrarme
                                    </Button>
                                    <Button className='mb-3' variant='dark' type='button' onClick={onChangeGoogle}>
                                        <Image src={icGoogle} />
                                        <span className='ms-3'>Registrarme con Google</span>
                                    </Button>
                                </>
                        }
                    </Form>
                    <Link className='navbar-brand text-success mb-3' to='/iniciarsesion'>
                        Ya tengo una Cuenta
                    </Link>
                    {errorAuth && <Badge bg="danger">{errorAuth}</Badge>}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Registro;