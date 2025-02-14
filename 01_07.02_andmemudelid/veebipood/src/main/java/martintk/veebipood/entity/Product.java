package martintk.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//hibernate
// automaatselt tekib andmebaasi tabel mis on klassi nimega

// file -> settings -> plugins -> JPA Buddy -> Install

// boolean

// String
// char

// int -> 2.1milj
// short 128
// byte -> 32

//float -> . 8 kohta
// double -> . 16 kohta
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // int
    private String name;
    private double price;
    private String image; // .jrpg
    private boolean active;

// public void setPrice(double price) {
//              this.price = prize
//              System.out.printIn("Kasutaja xxx muutis hinda. ID: " + this.id);
//    }
}
// kui on väikse tähega
// long
// char
// double
// boolean

// String ei ole primitiivne väärtus. Seega ei saa tema väärtusi kontrollida võrdlusmärgiga