import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App';
// import { QuizProvider } from './providers/QuizProvider';
import './assets/css/global.css';
import Router from './components/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
