import '../styles/globals.css'
import App from 'next/app';
import firebase, {FireBaseContext} from '../firebase';


function MyApp({ Component, pageProps }) {
  return (
    <FireBaseContext.Provider
      value={{
        firebase
      }}
    >
      <Component {...pageProps} />
    </FireBaseContext.Provider>
  );
}


export default MyApp
