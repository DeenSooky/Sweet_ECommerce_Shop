import Layout from '@/Components/Layout';
import '@/styles/globals.css';
import store from '@/redux/store';
import { Provider } from 'react-redux'

function AppFormat({ Component, pageProps}) {

  return(
    <Provider store = {store}> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};             

export default AppFormat;
