package martintk.kumnevoistlus.repository;

import martintk.kumnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}
