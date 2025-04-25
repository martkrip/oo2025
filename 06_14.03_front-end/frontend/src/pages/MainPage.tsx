import { useCallback, useEffect, useRef, useState } from 'react'
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Link } from 'react-router-dom';

// React Hook (Reacti erikood)
// 1. peab importima
// 2. peab algama use eesliidesega
// 3. peab olema funktsionaalne - tõmban ta käima nii, et panen sulud lõppu
// 4. ei tohi olla tingimuslikult loodud (if sees)
// 5. ei tohi olla funktsioonide sees loodud


function MainPage() {

    //Järgmine kord:
    // Leheküljed -- Pageable (Hibernate)
    // Kategooria alusel filtreerimine (custom päring Repository's)

      //muutuja - HTML   muudab muutujat + HTMLi
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productsByPage, setProductsByPage] = useState(1); 
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  const productsByPageRef = useRef<HTMLSelectElement>(null); // HTMLi inputiga/selectiga sidumisega
  // .current? ----> küsimärk tähendab, et TypeScript näeb, et Ref on alguses null ehk tühi
                                // see tähendab, et tal on 2 väärtuse võimalust
  // .current.value ----> selle selecti väärtus, mis väljastab alati Stringi
  // Number() ---> konverdime selle .current.value väärtuse numbriks tagasi
  const [sort, setSort] = useState("id,asc");
  // let page = 0; kui muudaks hiljem koodis: page = 1, siis ei läheks HTMLi uuendama
  

  // uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers,
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, []);


  const showByCategory = useCallback((categoryId: number, currentPage: number) => {
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage +
      "&page=" + currentPage +
      "&sort=" + sort, ) // currentPage, sest React update-b useState......
        .then(res=>res.json())
        .then(json=> {
          setProducts(json.content)
          setTotalProducts(json.totalElements);
          setTotalPages(json.totalPages);
        })
  }, [productsByPage, sort])

  useEffect(() => {
    showByCategory(activeCategory, 0);
  }, [showByCategory, activeCategory])

  // const showByCategory =() => {} (uus versioon)

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage);
  }

  return (
    <div>
      <button onClick={() => setSort("id,asc")}>Sorteeri vanemad enne</button>
      <button onClick={() => setSort("id,desc")}>Sorteeri uuemad enne</button>
      <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => setSort("price,asc")}>Sorteeri odavamad enne</button>
      <button onClick={() => setSort("price,desc")}>Sorteeri kallimad enne</button>
      <select ref={productsByPageRef}
              onChange={() => setProductsByPage(Number(productsByPageRef.current?.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
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
        <Link to={"/product/" + products.id}>
        <button>Vt lähemalt</button>
        </Link>
        </div> )}
        <button disabled={page === 0}onClick={() => updatePage(page - 1)}>Eelmine</button>
        <span>{page + 1}</span>
        <button disabled={page >= totalPages - 1} 
         onClick={() => updatePage(page + 1)}>Järgmine</button>
        <br />
        <br />
    </div>
  )
}

export default MainPage