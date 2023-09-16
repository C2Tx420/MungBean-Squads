import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@radix-ui/themes/styles.css';
import './index.scss'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import WalletAdapter from './components/wallet-adapter/WalletAdapter.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <WalletAdapter>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletAdapter>
  // </React.StrictMode>,
)
