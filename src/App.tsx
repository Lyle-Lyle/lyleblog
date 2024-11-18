import { useState } from 'react';

import './App.css';
import Home from './views/frontend/home';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
