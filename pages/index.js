import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import {FireBaseContext} from '../firebase/index';

export default function Home() {

  const [productos, setProductos] = useState([]);

  const {firebase} = useContext(FireBaseContext);

  const obtenerProductos = () => {
    firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot);
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
        <h1>Inicio</h1>
      </Layout>

    </div>
  )
}
