package martintk.veebipood.controller;

import martintk.veebipood.entity.Product;
import martintk.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // Autowired all joon, mis soovitab kasutada seda (aga teeb sama välja):
    // public ProductController (ProductRepository productRepository) {
    // this.productRepository = productRepository;
// }
    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getproducts() {
        return productRepository.findAll(); // [] -> SELECT * FROM extends JpaRepository<Product>
    }
    @PostMapping("products") // POSTMAN rakendus
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); // INSERT INTO products
        return productRepository.findAll();
    }
    // DELETE localhost:8080/products/1
    @DeleteMapping("products/{id}")
    public List<Product> deleteproduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return productRepository.findAll();
    }
    @PutMapping("products")
    public List<Product> editproduct(@RequestBody Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }
    @GetMapping("products/{id}")
    public Product getproduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    // kui on 1 on ilusam kasutada @pathVariable
    // kui on 2 või enam parameetrit peaks kasutama RequestParam
    // localhost:8080/products/4/name/Aura
    @PatchMapping("products") // PATCH localhost:8080/products?id=4&field=name&value=Aura
    public List<Product> editProductValue(@RequestParam Long id, String field, String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow();
        switch (field) { // switch on ilusam kui if ja else if
            case "name" -> product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0) {
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                    product.setPrice(Double.parseDouble(value));
            }
            case "image" -> product.setImage(value);
            case "active" -> product.setActive(Boolean.parseBoolean(value));
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    // const filteredProducts = []; javaskriptis
//    @GetMapping("/category-products")
//    public List<Product> getCategoryProducts(@RequestParam Long categoryId) {
//        List<Product> products = productRepository.findAll();
//        List<Product> filteredProducts = new ArrayList<>(); // tühi List
//        // for (int i = 0; i < products.size(); i++) {
//        //    if (products.get(i)).getCategory().getId().equals(categoryId)) {
//        //          filteredProducts.add(products.get(i));
//        //          }
//        //  }
//        for (Product p: products) {
//            // == --> kontrollib kas vasak pool ja parem pool on identsed
//            // .equals --> kontrollib, kas vasaku ja parema poole väärtused on identsed
//            if (p.getCategory().getId().equals(categoryId)) {
//                filteredProducts.add(p);
//            }
//        }
//        return filteredProducts;
//    }

    //localhost:8080/category-products?categoryId=1&page=0&size=2
    @GetMapping("/category-products")
    public Page<Product> getCategoryProducts(@RequestParam Long categoryId, Pageable pageable) {
        if (categoryId == -1) {
            return productRepository.findAll(pageable); //returniga funktsioon lõppeb, else blokki pole vaja
        }
        return productRepository.findByCategory_Id(categoryId, pageable);
    }
}

// 1xx --> informatiivsed - meie ei kasuta
// 2xx --> edukad 200   201(created
// 3xx --> suunamine - meie ei kasuta
// 4xx --> päringu tegija veaga (front-end viga). client error
//         400 - üldine viga
//          401, 603 - autentimisega seotud vead
//          402 - maksetega seotud vead
//          404 - api endpoint on vale
//          405 - Method not allowed
//          415 - sisu tüüp on vale
// 5xx --> back-end viga. 500
