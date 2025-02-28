package martintk.kumnevoistlus.controller;

import martintk.kumnevoistlus.entity.Result;
import martintk.kumnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    ResultRepository resultRepository;

    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }
    @PostMapping("results")
    public List<Result> addResults(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isBlank()) {
            throw new RuntimeException("ERROR_CANNOT_ADD_EVENT_WITHOUT_NAME");
        }
        resultRepository.save(result);
        return resultRepository.findAll();
    }

}
