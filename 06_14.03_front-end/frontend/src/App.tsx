//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom"
import MainPage from './pages/MainPage';
import ManageProducts from './pages/ManageProducts';
import Arrayd from './pages/Arrayd';
import Menu from './Components/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import ManageCategories from './pages/ManageCategories';
import EditProduct from './pages/EditProduct';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <>
{/* localhost:5173/ ---> <div>MainPage</div>
  localhost:5173/admin/products ---->
  */}
  <Menu />

    <Routes>
      <Route path='/' element={ <MainPage />} />
      <Route path="/admin/products" element={ <ManageProducts /> } />
      <Route path="/admin/categories" element={ <ManageCategories /> } />
      <Route path="/admin/edit-product/:productId"element={ <EditProduct /> } />
      <Route path="/arrays" element={ <Arrayd /> } />
      <Route path="/cart" element={ <Cart /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/signup" element={ <Signup /> } />
      <Route path="/orders" element={ <Orders /> } />
      <Route path="/product/:productId" element={ <SingleProduct /> } />


      <Route path="/*" element={ <div>Page not found</div>  } />
    </Routes>

    {/* käib FOOTER */}
    </>
  )
}
// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderlused, siis ta jätab kõik mällu v.a.
// tsükli sisud, sest tal pole mingit aimu, mille järgi seda meelde jätta
// selle jaoks, et ta saaks meelde jätta, lisame key={}

export default App;
