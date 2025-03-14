package martintk.veebipood.controller;

import martintk.veebipood.entity.Order;
import martintk.veebipood.entity.Product;
import martintk.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    // TODO: Ei tagastataks kõiki tellimusi
    // TODO: Pean võtma front-endist ainult ID ja mitte usaldama front-endist tulevad toote hinda
    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order) {
        order.setCreated(new Date());
        double sum = 0;
        for (Product p: order.getProducts() ) {
            sum = sum + p.getPrice();
            // sum += p.getPrice();
        }
        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }
}
