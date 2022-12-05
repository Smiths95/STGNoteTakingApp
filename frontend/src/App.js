import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';

// npm i reacty-router-dom
// npm i axios - makes API calls to backend


import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';
import CreatePage from './pages/CreatePage';
import DeletePage from './pages/DeletePage';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SigninPage /> } />
          <Route path='/dashboard' element={ <DashboardPage /> } />
          <Route path='/create' element={ <CreatePage /> } />
          <Route path='/delete/:id' element={ <DeletePage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
