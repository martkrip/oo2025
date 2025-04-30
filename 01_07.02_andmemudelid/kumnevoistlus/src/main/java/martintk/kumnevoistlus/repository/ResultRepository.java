package martintk.kumnevoistlus.repository;

import martintk.kumnevoistlus.entity.Athlete;
import martintk.kumnevoistlus.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByAthlete(Athlete athlete);
}
