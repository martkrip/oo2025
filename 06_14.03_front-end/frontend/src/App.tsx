import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Category } from './models/Category';
import { Product } from './models/Product';

function App() {
  //const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod =[
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Audi", "mudel": "TT", "year": 2016},
    {"mark": "Mercedes", "mudel": "S", "year": 2014},
    {"mark": "VW", "mudel": "Golf", "year": 2012},
  ];
  //muutuja - HTML   muudab muutujat + HTMLi
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  

  // uef _> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers,
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers,
        .then(json=> setProducts(json)) // body: sisu mida tagastab meile back-end
  }, []);

  return (
    <>
     {/* <div>{7 + 7}</div>
     <div> 7 + 7</div>
     <div>{kogus}</div>
     <div>{count}</div> */}
     {sonad.map(sona => 
     <div key={sona}>
      {sona}
      </div>)}
      <br />
      <br />
     {autod.map(auto =>
       <div key={auto.mark+auto.mudel}>
        {auto.mark} - {auto.mudel} ({auto.year})
        </div>)}
     <br />
     <br />
     {kategooriad.map(kategooria =>
       <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
        </div>)}
        <br />
        <br />
        {products.map(products =>
       <div key={products.id}>
        <div>{products.id}</div>
        <div>{products.name}</div>
        <div>{products.price}</div>
        <div>{products.image}</div>
        <div>{products.category?.name}</div>
        <br />
        <br />
        <div key={orders.id}>
        <div>{orders.id}</div>
        <div>{orders.created}</div>
        <div>{orders.person}</div>
        <div>{orders.products}</div>
        <div>{orders.totalSum}</div>
    </div> )}
    </>
  )
}

// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderlused, siis ta jätab kõik mällu v.a.
// tsükli sisud, sest tal pole mingit aimu, mille järgi seda meelde jätta
// selle jaoks, et ta saaks meelde jätta, lisame key={}

export default App
