package martintk.kontrolltoo2.Controller;

import martintk.kontrolltoo2.Entity.Album;
import martintk.kontrolltoo2.Repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AlbumController {

    @Autowired
    AlbumRepository albumRepository;

    @GetMapping("albums")
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }
}
