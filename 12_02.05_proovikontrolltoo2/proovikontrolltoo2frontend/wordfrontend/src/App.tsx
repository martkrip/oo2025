//import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';
import Menu from './Components/Menu';
import ManageWords from './pages/ManageWords';
import LookCloser from './pages/LookCloser';
function App() {

  return (
    <>
    <Menu />

      <Routes>
        <Route path="/" element={ <MainPage />} />
        <Route path="/managewords" element={ <ManageWords /> } />
        <Route path="/word/:id" element={ <LookCloser /> } />
        <Route path="/*" element={ <div>Page not found</div>  } />
      </Routes>
    </>
  )
}

export default App
