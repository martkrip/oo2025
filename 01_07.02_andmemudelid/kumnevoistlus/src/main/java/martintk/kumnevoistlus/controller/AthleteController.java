package martintk.kumnevoistlus.controller;

import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;

    // localhost:8080/athlete
    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }

    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getAge() <= 0) {
            throw new RuntimeException("ERROR_AGE_MUST_BE_POSITIVE");
        }
        if (athlete.getName() == null || athlete.getName().isBlank()) {
            throw new RuntimeException("ERROR_NAME_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isBlank()) {
            throw new RuntimeException("ERROR_COUNTRY_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
    @GetMapping("athletes/{id}")
    public Athlete getAthlete(@PathVariable Long id) {
        return athleteRepository.findById(id).orElseThrow();
    }

    @PatchMapping("athletes")
    public List<Athlete> editAthleteValue(@RequestParam Long id, String field, String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Athlete athlete = athleteRepository.findById(id).orElseThrow();
        switch (field) {
            case "name": athlete.setName(value);
            case "country": athlete.setCountry(value);
            case "age": athlete.setAge(Integer.parseInt(value));
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
}