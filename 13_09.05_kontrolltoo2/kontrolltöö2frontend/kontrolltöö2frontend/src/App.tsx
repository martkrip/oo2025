import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlbumList from './pages/AlbumList';
import AlbumPhotos from './pages/AlbumPhotos';
import './App.css'
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import ManagePhotos from './pages/ManagePhotos';
function App() {

  return (
    <>
    <Menu />

      <Routes>
        <Route path="/albums" element={ <AlbumList />} />
        <Route path="/albums/:albumId/photos" element={ <AlbumPhotos />} />
        <Route path="/" element={ <MainPage />} />
        <Route path="/managePhotos" element={ <ManagePhotos /> } />
        <Route path="/*" element={ <div>Page not found</div>  } />
      </Routes> 
    </>
  )
}

export default App
