import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAutenticacion(){
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    useEffect(() => {

        const unsubscribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario){
                setUsuarioAutenticado(usuario);
            }else{
                setUsuarioAutenticado(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return usuarioAutenticado;

}

export default useAutenticacion;