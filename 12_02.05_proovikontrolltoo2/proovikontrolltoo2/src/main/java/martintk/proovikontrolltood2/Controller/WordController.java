package martintk.proovikontrolltood2.Controller;

import martintk.proovikontrolltood2.Entity.Word;
import martintk.proovikontrolltood2.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping("words")
    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }
    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        if (word.getTypeid() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITHOUT_ID");
        }
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @DeleteMapping("/words/{typeid}")
    public List<Word> deleteword(@PathVariable Long typeid) {
        wordRepository.deleteById(typeid);
        return wordRepository.findAll();
    }

    @PutMapping("/words/{typeid}")
    public List<Word> updateWord(@PathVariable Long typeid, @RequestBody Word updatedWord) {
        Word existingWord = wordRepository.findById(typeid)
                .orElseThrow(() -> new RuntimeException("ERROR_CANNOT_UPDATE_WITHOUT_WORD"));

        existingWord.setType(updatedWord.getType());
        existingWord.setDescription(updatedWord.getDescription());
        wordRepository.save(existingWord);
        return wordRepository.findAll();
    }
    @GetMapping("/words/{id}")
    public ResponseEntity<Word> getWordById(@PathVariable long id) {
        Optional<Word> word = wordRepository.findById(id);
        return word.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
