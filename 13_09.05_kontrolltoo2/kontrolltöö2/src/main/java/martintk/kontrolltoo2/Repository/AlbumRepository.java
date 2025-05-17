package martintk.kontrolltoo2.Repository;

import martintk.kontrolltoo2.Entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
}
