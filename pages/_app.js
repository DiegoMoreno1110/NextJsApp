import '../styles/globals.css'
import App from 'next/app';
import firebase, {FireBaseContext} from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion();
  console.log(usuario);

  return (
    <FireBaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <Component {...pageProps} />
    </FireBaseContext.Provider>
  );
}


export default MyApp
