package martintk.sonadeloputood.Repository;

import martintk.sonadeloputood.Entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
