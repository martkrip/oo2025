package martintk.kumnevoistlus.controller;

import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.entity.Result;
import martintk.kumnevoistlus.repository.AthleteRepository;
import martintk.kumnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("athletes")
    public Map<String, Object> getAthletes(
            @RequestParam(required = false) String country,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Athlete> athletePage = (country != null)
                ? athleteRepository.findByCountryIgnoreCase(country, pageable)
                : athleteRepository.findAll(pageable);

        List<Map<String, Object>> responseList = new ArrayList<>();

        for (Athlete athlete : athletePage.getContent()) {
            List<Result> results = resultRepository.findByAthlete(athlete);
            Map<String, Integer> eventPoints = results.stream()
                    .collect(Collectors.toMap(Result::getEvent, Result::getPoints));
            int totalPoints = eventPoints.values().stream().mapToInt(Integer::intValue).sum();

            Map<String, Object> athleteData = new HashMap<>();
            athleteData.put("id", athlete.getId());
            athleteData.put("name", athlete.getName());
            athleteData.put("country", athlete.getCountry());
            athleteData.put("age", athlete.getAge());
            athleteData.put("results", eventPoints);
            athleteData.put("totalPoints", totalPoints);

            responseList.add(athleteData);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", responseList);
        response.put("totalPages", athletePage.getTotalPages());
        response.put("totalElements", athletePage.getTotalElements());

        return response;
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

        if (athlete.getResults() == null) {
            for (Result result : athlete.getResults()) {
                result.setAthlete(athlete);
            }
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (athlete.getResults() != null) {
            for (Result result : athlete.getResults()) {
                result.setAthlete(athlete);
            }
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