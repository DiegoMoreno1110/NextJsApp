import React, { useContext, useEffect, useState } from 'react';
import DetallesProducto from '../components/layout/DetallesProducto';
import Layout from '../components/layout/Layout';
import {FireBaseContext} from '../firebase/index';

const Populares = () => {

    const [productos, setProductos] = useState([]);

    const {firebase} = useContext(FireBaseContext);

    const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy('votos', 'desc').onSnapshot(manejarSnapshot);
    }

    useEffect(() => {
        obtenerProductos();
    }, []);

    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        });

        setProductos(productos);
    }

    return (
        <div>
        <Layout>
            <div className="listado-productos">
            <div className="contenedor">
                <ul className="bg-white">
                {productos.map(producto => (
                    <DetallesProducto
                    key={producto.id}
                    producto={producto}
                    />
                ))}
                </ul>
            </div>
            </div>
        </Layout>

        </div>
    )
}

export default Populares;