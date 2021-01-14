import React, { useState } from 'react';
import {css} from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario';
import firebase from '../firebase/index';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const Login = () => {
    const [error, setError] = useState(false);

    const STATE_INICIAL = {
        email: '',
        password: ''
    }

    const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const {email, password} = valores;

    async function iniciarSesion(){
        try {
            const usuario = await firebase.login(email, password);
            console.log(usuario);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al iniciar  sesion', error.message);
            setError(error.message)
        }
    }

    return(
        <div>
            <Layout>
                <>
                    <h1
                        css={
                            css`
                                text-align: center;
                                margin-top: 5rem;
                            `
                        }
                    >Iniciar Sesión</h1>
                    <Formulario 
                        onSubmit={handleSubmit}
                        noValidate    
                    >
                        
                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.email && <Error>{errores.email}</Error> }

                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.password && <Error>{errores.password}</Error> }

                        {error && <Error>{error}</Error> }

                        <InputSubmit
                            type="submit"
                            value="Iniciar Sesión"
                        />

                    </Formulario>
                </>
            </Layout>
        </div> 
    );
}

export default Login;