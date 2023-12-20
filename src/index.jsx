import { h, Component, render } from 'preact';
// import { LocationProvider, Router, Route } from 'preact-iso';
import { Router, Route, Link } from 'preact-router';

import Header from './components/Header.jsx';
import { Invoicing } from './pages/Invoicing/index.jsx';
import ItemMaintenance from './pages/ItemMaintenance/index.jsx';
import ConfigPages from './pages/ConfigPages/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './styles/index.css';

import {
  prefetch
} from '../helpers.js';

import Sidebar from './components/Sidebar';

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
        <main class="p-4 sm:ml-64 w-full overflow-auto">
          <Router>
            <Invoicing path="/" />
            <ItemMaintenance path="/item-maintenance" />
            <ConfigPages path="/configs" />
            <Route default component={NotFound} />
          </Router>
        </main>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('app'));
