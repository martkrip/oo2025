package martintk.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders") // andmebaasis tuleb tabeli nimi "Orders"
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // int
    private Date created; // Date importida --> java.util.Date

    @ManyToOne // personil võib olla mitu tellimust
    private Person person;

    @ManyToMany // ManyToMany'l on vaja listi
    private List<Product> products; // List importida --> java.util.List

    private double totalSum;
    // Personil
    // @OneToMany
    //private List<Address> address; sobib, sest aadress ei ole taaskasutatav
}
