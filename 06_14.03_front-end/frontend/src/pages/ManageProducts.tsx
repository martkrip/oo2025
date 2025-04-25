import { useEffect, useRef, useState } from "react";
import { Product } from "../models/Product"; // mul on ainsuses
import { Category } from "../models/Category";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
 
function ManageProducts() {
 
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
 
  useEffect(() => {
    fetch("http://localhost:8080/products")
        .then(res=>res.json())
        .then(json=> setProducts(json))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
        .then(res=>res.json())
        .then(json=> setCategories(json))
  }, []);
 
  const deleteProduct = (id: number) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    }).then(() => 
      setProducts(products.filter(product => product.id !== id)));
    ;
  };

  // document.getElementById("name").value
  // nameRef.current?.value

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const addProduct = () => {
    const newProduct = {
      name: nameRef.current?.value,
      price: Number(priceRef.current?.value), // kui on numbriline väärtus, siis peaksin Number() ümber panema
      image: imageRef.current?.value,
      active: activeRef.current?.checked, // kui on checkbox, siis ei ole. value (muidu annab "on")
      category: {"id": Number(categoryRef.current?.value)}
    }

    fetch(`http://localhost:8080/products`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json())
      .then(json=> {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setProducts(json);
        toast.success("Uus toode lisatud!");
      } else {
        toast.error(json.message);
      }
    })
    }
 
  return (
    <div>
      <h2>Manage Products</h2>

      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <label>Category</label> <br />
      {/*<input ref={categoryRef} type="number" /> <br />*/}
      <select ref={categoryRef}>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <br />

      <button onClick={() => addProduct()}>Add product</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>{product.category?.name}</td>
              <td>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
              <td>
                <Link to={"/admin/edit-product/" + product.id}>
                <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
 
export default ManageProducts;