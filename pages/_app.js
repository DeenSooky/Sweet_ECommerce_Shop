// Import necessary dependencies
import Layout from '../Components/Layout';
import store from '../redux/store';
import '../styles/globals.css';
import { Provider } from 'react-redux';

// AppFormat component
function AppFormat({ Component, pageProps }) {
  // Return the main structure of the application
  return (
    // Wrap the entire application with the Redux store provider
    <Provider store={store}>
      {/* Use the Layout component to provide a consistent layout structure */}
      <Layout>
        {/* Render the specific component passed as a prop */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

// Export the AppFormat component as the default export
export default AppFormat;
