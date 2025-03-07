package martintk.Libisevkondimine.Controller;

import martintk.Libisevkondimine.Entity.Arv;
import martintk.Libisevkondimine.Repository.ArvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ArvController {

    @Autowired
    ArvRepository arvRepository;

    @GetMapping("arvud")
    public List<Arv> getArvud(){
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
}
