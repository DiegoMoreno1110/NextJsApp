import React, { useState, useContext } from 'react';
import {css} from '@emotion/react';
import Router, {useRouter} from 'next/router';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Error} from '../components/ui/Formulario';
import {FireBaseContext} from '../firebase/index';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto'

const NuevoProducto = () => {

    const [error, setError] = useState(false);

    const STATE_INICIAL = {
        nombre : '',
        empresa: '',
        //imagen: '',
        url: '',
        descripcion: ''
    }

    const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

    const {nombre, empresa, url, descripcion} = valores;

    const router = useRouter();

    // contexte con crud de firebase
    const {usuario, firebase} = useContext(FireBaseContext);

    async function crearProducto(){
        if(!usuario){
            return router.push('/login');
        }

        // crear el objeto de un nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        firebase.db.collection('productos').add(producto);

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
                    >Agregar producto</h1>
                    <Formulario 
                        onSubmit={handleSubmit}
                        noValidate    
                    >
                        <fieldset>
                            <legend>Información General</legend>
                        
                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Tu nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.nombre && <Error>{errores.nombre}</Error> }

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input
                                    type="text"
                                    id="empresa"
                                    placeholder="Tu empresa"
                                    name="empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.empresa && <Error>{errores.empresa}</Error> }

                            {/*
                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <input
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    value={imagen}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.imagen && <Error>{errores.imagen}</Error> }
                            */}

                            <Campo>
                                <label htmlFor="url">Url</label>
                                <input
                                    type="url"
                                    id="url"
                                    placeholder="Tu url"
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.url && <Error>{errores.url}</Error> }
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu producto</legend>
                            <Campo>
                                <label htmlFor="descripcion">Descrpción</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>

                            {errores.descripcion && <Error>{errores.descripcion}</Error> }
                        </fieldset>
                        
                        {error && <Error>{error}</Error> }

                        <InputSubmit
                            type="submit"
                            value="Crear producto"
                        />

                    </Formulario>
                </>
            </Layout>
        </div> 
    );
}

export default NuevoProducto;