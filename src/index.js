import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aruna_Agency from './Aruna_Agency';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Userlogin from './Userlogin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route>
    <Route path="/" element={<Userlogin />} />
    <Route path="/Aruna_Agency" element={<Aruna_Agency />} />
    </Route>
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


