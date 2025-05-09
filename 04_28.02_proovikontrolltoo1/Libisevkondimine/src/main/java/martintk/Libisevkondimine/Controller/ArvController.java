package martintk.Libisevkondimine.Controller;

import martintk.Libisevkondimine.Entity.Arv;
import martintk.Libisevkondimine.Repository.ArvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ArvController {

    @Autowired
    ArvRepository arvRepository;

    @GetMapping("arvud")
    public List<Arv> getArvud() {
        return arvRepository.findAll();
    }

    @PostMapping("arvud")
    public List<Arv> addArv(@RequestBody Arv arv){
        if (arv.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        arvRepository.save(arv);
        return arvRepository.findAll();
    }

    @GetMapping("arvudesummad")
    public Integer getArvudesummad() { // Makes an HTTP GET endpoint at /arvudesumma
        return arvRepository.findAll() // fetches all records of Arv table from the database
            .stream()// converts list into Java Stream for processing
                .mapToInt(Arv::getArv) // Extracts the arv field from each object and converts it into int stream
                .sum(); // adds all the numbers together and returns the total
    }

    @GetMapping("arvudekeskmine")
    public double getArvudekeskmine() {
        return arvRepository.findAll()
                .stream()
                .mapToInt(Arv::getArv)
                .average() // gets the average
                .orElse(0.0); // If the list is empty, it returns 0.0 instead of causing an error.
    }

    @GetMapping("arvudemax")
    public int getArvudeMax() {
        return arvRepository.findAll()
                .stream()
                .mapToInt(Arv::getArv)
                .max() // finds the largest number
                .orElseThrow(() -> new RuntimeException("DATABASE IS EMPTY")); // if list is empty, throws error
    }
    @GetMapping("arvudelibisevkeskmine")
    public List<Double> getArvudeLibisevKeskmine() { // returns a List of Double values.
            List<Arv> arvud = arvRepository.findAll(); // takes all Arv and puts it into arvud list
            List<Double> tulemused = new ArrayList<>(); // creates an empty list

            for (int i = 0; i < arvud.size() -2; i++) { // starts a loop that goes through the list of numbers until two elements before the end
                int a = arvud.get(i).getArv(); // extracts all three consecutive numbers
                int b = arvud.get(i+1).getArv();
                int c = arvud.get(i+2).getArv();

                double keskmine = (a + b + c) / 3.0; // calculates the average
                tulemused.add(keskmine); // adds the average to the tulemused list
            }

            return tulemused; // returns the list
    }
}
