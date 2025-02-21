package martintk.veebipood.repository;

import martintk.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

// .findAll() --> List<Person>
// .save(Person)
// .findById(Long)
// .deleteById(Long)

public interface PersonRepository extends JpaRepository<Person, Long> {
}
