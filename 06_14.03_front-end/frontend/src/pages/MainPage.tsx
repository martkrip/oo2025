import { useEffect, useState } from 'react'
import { Category } from '../models/Category';
import { Product } from '../models/Product';
function MainPage() {

    //Järgmine kord:
    // Leheküljed -- Pageable (Hibernate)
    // Kategooria alusel filtreerimine (custom päring Repository's)

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
    <div>
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
        </div> )}
        <br />
        <br />
    </div>
  )
}

export default MainPage