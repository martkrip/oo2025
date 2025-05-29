package martintk.kumnevoistlus.controller;

import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.entity.Result;
import martintk.kumnevoistlus.repository.AthleteRepository;
import martintk.kumnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ResultController {

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }

    @PostMapping("results")
    public List<Result> addResults(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isBlank()) {
            throw new RuntimeException("ERROR_CANNOT_ADD_EVENT_WITHOUT_NAME");
        }
        if (result.getEvent().equals("100m") || result.getEvent().equals("400m") ||
                result.getEvent().equals("110m hurdles") || result.getEvent().equals("1500m")) {
            result.setPoints(calculateTrackPoints(result.getResult(), 25.4347, 18, 1.81));
        } else if (result.getEvent().equals("Long jump") || result.getEvent().equals("Shot put") ||
                result.getEvent().equals("High jump") || result.getEvent().equals("Discus throw") ||
                result.getEvent().equals("Pole vault") || result.getEvent().equals("Javelin throw")) {
            result.setPoints(calculateFieldPoints(result.getResult(), 0.14354, 220, 1.4));
        } else {
            throw new RuntimeException("ERROR_INVALID_EVENT");
        }

        resultRepository.save(result);
        return resultRepository.findAll();
    }

    @PutMapping("results/{id}")
    public Result updateResult(@PathVariable Long id, @RequestBody Result updatedResult) {
        Result existingResult = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        if (updatedResult.getEvent() == null || updatedResult.getEvent().isBlank()) {
            throw new RuntimeException("ERROR_CANNOT_ADD_EVENT_WITHOUT_NAME");
        }

        existingResult.setEvent(updatedResult.getEvent());
        existingResult.setResult(updatedResult.getResult());

        if (updatedResult.getEvent().equals("100m") || updatedResult.getEvent().equals("400m") ||
                updatedResult.getEvent().equals("110m hurdles") || updatedResult.getEvent().equals("1500m")) {
            existingResult.setPoints(calculateTrackPoints(updatedResult.getResult(), 25.4347, 18, 1.81));
        } else if (updatedResult.getEvent().equals("Long jump") || updatedResult.getEvent().equals("Shot put") ||
                updatedResult.getEvent().equals("High jump") || updatedResult.getEvent().equals("Discus throw") ||
                updatedResult.getEvent().equals("Pole vault") || updatedResult.getEvent().equals("Javelin throw")) {
            existingResult.setPoints(calculateFieldPoints(updatedResult.getResult(), 0.14354, 220, 1.4));
        } else {
            throw new RuntimeException("ERROR_INVALID_EVENT");
        }

        return resultRepository.save(existingResult);
    }

    public int calculateTrackPoints(double result, double A, double B, double C) {
        return (int) Math.floor(A * (B - result) * C);
    }

    public int calculateFieldPoints(double result, double A, double B, double C) {
        return (int) Math.floor(A * (result - B) * C);
    }

    @GetMapping("athlete/total-points")
    public int getAthleteTotalPoints(@RequestParam Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));
        List<Result> results = resultRepository.findByAthlete(athlete);
        int totalPoints = results.stream().mapToInt(Result::getPoints).sum();
        return totalPoints;
    }

}
