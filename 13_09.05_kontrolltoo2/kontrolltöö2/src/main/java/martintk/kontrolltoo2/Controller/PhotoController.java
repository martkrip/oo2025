package martintk.kontrolltoo2.Controller;
import martintk.kontrolltoo2.Entity.Album;
import martintk.kontrolltoo2.Entity.Photo;
import martintk.kontrolltoo2.Repository.AlbumRepository;
import martintk.kontrolltoo2.Repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PhotoController {

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    AlbumRepository albumRepository;

    @GetMapping("photos")
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }
    @PostMapping("photos")
    public List<Photo> addPhoto(@RequestBody Photo photo) {
        if (photo.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID_PRESENT");
        }
        if (photo.getAlbum() == null && photo.getAlbum().getId() != null) {
            Album album = albumRepository.findById(photo.getAlbum().getId())
            .orElseThrow(() -> new RuntimeException("ERROR_ALBUM_NOT_FOUND"));
            photo.setAlbum(album);
        }
        photoRepository.save(photo);
        return photoRepository.findAll();
    }

    @DeleteMapping("/photos/{id}")
    public List<Photo> deletePhoto(@PathVariable Long id) {
        photoRepository.deleteById(id);
        return photoRepository.findAll();
    }

    @PutMapping("/photos/{id}")
    public List<Photo> updatePhoto(@PathVariable Long id, @RequestBody Photo updatedPhoto) {
        Photo existingPhoto = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_CANNOT_UPDATE_WITHOUT_PHOTO"));


        existingPhoto.setTitle(updatedPhoto.getTitle());
        existingPhoto.setUrl(updatedPhoto.getUrl());
        existingPhoto.setThumbnailUrl(updatedPhoto.getThumbnailUrl());

        if (updatedPhoto.getAlbum() != null && updatedPhoto.getAlbum().getId() != null){
            Album album = albumRepository.findById(updatedPhoto.getAlbum().getId())
                    .orElseThrow(() -> new RuntimeException("ERROR_CANNOT_UPDATE_WITH_ALBUM"));
            existingPhoto.setAlbum(album);
        }
        photoRepository.save(existingPhoto);
        return photoRepository.findAll();
    }
    @GetMapping("/photos/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable long id) {
        Optional<Photo> word = photoRepository.findById(id);
        return word.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/photos/paged")
    public Page<Photo> getPhotosPaged(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return photoRepository.findAll(pageable);
    }
    @GetMapping("/albums/{albumId}/photos")
    public List<Photo> getPhotosByAlbumId(@PathVariable Long albumId) {
        return photoRepository.findByAlbum_Id(albumId);
    }
}
