/* package martintk.kumnevoistlus.service;
import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.entity.Result;
import martintk.kumnevoistlus.repository.AthleteRepository;
import martintk.kumnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    public Athlete addAthlete(Athlete athlete) {
        return athleteRepository.save(athlete);
    }
    public Result addResult(Result result) {
        result.setPoints(result.getPoints()); // ???
        return resultRepository.save(result);
    }
    public int calculateTrackPoints(double time, double A, double B, double C) {
        return (int) Math.floor(A * (B - time) * C);
    }
    public int calculateFieldPoints(double performance, double A, double B, double C) {
        return (int) Math.floor(A * (performance - B) * C);
    }

    public static void main(String[] args) {
        ResultService resultService = new ResultService();

    int points100m = ResultService.calculateTrackPoints(10.5, 25.4347, 18, 1.81);
            System.out.println("100m Points: " + points100m);

    int pointsLongJump = resultService.calculateFieldPoints(800, 0.14354, 220, 1.4);
            System.out.println("Long Jump Points: " + pointsLongJump);

    int pointsShotput = resultService.calculateFieldPoints(800, 0.14354, 220, 1.4);
}
*/