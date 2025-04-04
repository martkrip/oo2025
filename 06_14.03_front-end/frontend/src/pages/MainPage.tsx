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
  const [totalProducts, setTotalProducts] = useState(0);
  const productsByPage = 1;
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  // let page = 0; kui muudaks hiljem koodis: page = 1, siis ei läheks HTMLi uuendama
  

  // uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers,
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, []);

  useEffect(() => {
    showByCategory(-1, 0);
  }, []);

  function showByCategory(categoryId: number, currentPage: number) {
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage +
      "&page=" + currentPage)
        .then(res=>res.json())
        .then(json=> {
          setProducts(json.content)
          setTotalProducts(json.totalElements);
        })
  }

  // const showByCategory =() => {} (uus versioon)

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage);
  }

  return (
    <div>
      <button onClick={() => showByCategory(-1, 0)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria =>
       <button key={kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
        {kategooria.name}
        </button> )}
        <br />
        <br />
        <div>Kokku tooteid: {totalProducts}</div>
    {products.map(products =>
       <div key={products.id}>
        <div>{products.id}</div>
        <div>{products.name}</div>
        <div>{products.price}</div>
        <div>{products.image}</div>
        <div>{products.category?.name}</div>
        </div> )}
        <button disabled={page === 0}onClick={() => updatePage(page - 1)}>Eelmine</button>
        <span>{page + 1}</span>
        <button disabled={page === Math.ceil(totalProducts/productsByPage)} onClick={() => updatePage(page + 1)}>Järgmine</button>
        <br />
        <br />
    </div>
  )
}

export default MainPage