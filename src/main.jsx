import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import { store } from './redux';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>);
