import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../models/Product';

// kõik use-ga algavad on Reacti Hookid

function SingleProduct() {

    // kui on kooloniga taga productId, siis peab olema siin productId
    const {productId} = useParams();
    // window.location.href.split("/product/")[1] -> tavalises JavaScript

    const [product, setProduct] = useState<Product>();


    // uef. midagi ei läheks korduvalt käima. korduvalt läheb käima, kui muutub mõni muutuja
    // dependency array sees
    useEffect(() => {
        fetch("http://localhost:8080/products/" + productId)
        .then(res => res.json())
        .then(json => setProduct(json));
    }, []);

  return (
    <div>
      <div>Nimi: {product?.name}</div> 
      <div>Hind: {product?.price}</div> 
      <div>Kategooria: {product?.category?.name}</div>
      <img src={product?.image} alt="" />
    </div>
  )
}

export default SingleProduct