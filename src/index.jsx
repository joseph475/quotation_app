import { h, Component, render } from 'preact';
import { Router, Route, Link } from 'preact-router';
import Header from './components/Core/Header.jsx';
import { ToastContainer } from 'react-toastify';
import './index.css';
import {
  prefetch
} from '../helpers.js';

import Sidebar from './components/Core/Sidebar.jsx';
import PurchaseOrder from './pages/PurchaseOrder/index.jsx';
import ConfigPages from './pages/ConfigPages/index.jsx';
import ItemMaintenance from './pages/ItemMaintenance/index.jsx';
import { Invoicing } from './pages/Invoicing/index.jsx';
import { NotFound } from './pages/_404.jsx';

export function App() {

  try {
    prefetch()
  }
  catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }

  return (
    <div>
      <Header />
      <div class="flex">
        <Sidebar />
        <main class="px-4 py-2 sm:ml-64 w-full overflow-auto">
          <Router>
            <Invoicing path="/" />
            <ItemMaintenance path="/item-maintenance" />
            <PurchaseOrder path="/purchase-order" />
            <ConfigPages path="/configs" />
            <Route default component={NotFound} />
          </Router>
        </main>
      </div>
      <ToastContainer 
        autoClose={1500}
        pauseOnHover
      />
    </div>
  );
}

render(<App />, document.getElementById('app'));
