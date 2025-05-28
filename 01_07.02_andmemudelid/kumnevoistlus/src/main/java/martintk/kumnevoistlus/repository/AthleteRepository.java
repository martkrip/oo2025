package martintk.kumnevoistlus.repository;

import martintk.kumnevoistlus.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {

    Page<Athlete> findByCountryIgnoreCase(String country, Pageable pageable);
}
