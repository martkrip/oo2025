package martintk.proovikontrolltood2.Repository;

import martintk.proovikontrolltood2.Entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {

    Long typeid(Long typeid);
}
