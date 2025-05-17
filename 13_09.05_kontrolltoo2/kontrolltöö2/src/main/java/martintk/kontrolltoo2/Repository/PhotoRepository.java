package martintk.kontrolltoo2.Repository;

import martintk.kontrolltoo2.Entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByAlbum_Id(Long albumId);
}
