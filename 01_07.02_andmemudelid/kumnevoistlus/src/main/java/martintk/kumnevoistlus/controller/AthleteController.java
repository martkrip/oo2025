package martintk.kumnevoistlus.controller;

import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.entity.Result;
import martintk.kumnevoistlus.repository.AthleteRepository;
import martintk.kumnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController// defines routes for REST API
public class AthleteController {

    @Autowired // repositories are used for database interactions
    AthleteRepository athleteRepository;

    @Autowired // @autowired injects dependencies into the class automatically
    ResultRepository resultRepository;

    @GetMapping("athletes") //
    public List<Map<String, Object>> getAthletes() {
        List<Athlete> athletes = athleteRepository.findAll(); // retrieves all athletes from the database
        List<Map<String, Object>> responseList = new ArrayList<>(); // creates an empty list where every element is <map<string, object>>

        for (Athlete athlete : athletes) { // loops through each athlete
            List<Result> results = resultRepository.findByAthlete(athlete); // fetches results for the athlete

            Map<String, Integer> eventPoints = results.stream() // converts list into a stream for easier processing
                    .collect(Collectors.toMap( // collects the stream into a map. event names are keys of the map
                            Result::getEvent,
                            Result::getPoints
                    ));

            int totalPoints = eventPoints.values().stream().mapToInt(Integer::intValue).sum(); // calculates total points

            Map<String, Object> athleteData = new HashMap<>(); // creates an map
            athleteData.put("id", athlete.getId());
            athleteData.put("name", athlete.getName());
            athleteData.put("country", athlete.getCountry());
            athleteData.put("age", athlete.getAge());
            athleteData.put("results", eventPoints);
            athleteData.put("totalPoints", totalPoints);

            responseList.add(athleteData);
        }

        return responseList;
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