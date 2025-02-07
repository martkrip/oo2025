package martintk.veebipood.controller;

import martintk.veebipood.entity.Product;
import martintk.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getproducts() {
        return productRepository.findAll(); // [] -> SELECT * FROM extrends JpaRepository<Product>
    }
    @PostMapping("products") // POSTMAN rakendus
    public List<Product> addProduct(@RequestBody Product product) {
        productRepository.save(product); // INSERT INTO products
        return productRepository.findAll();
    }
}
