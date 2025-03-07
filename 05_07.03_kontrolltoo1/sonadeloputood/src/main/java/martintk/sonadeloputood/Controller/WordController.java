package martintk.sonadeloputood.Controller;

import martintk.sonadeloputood.Entity.ReversedWord;
import martintk.sonadeloputood.Entity.Word;
import martintk.sonadeloputood.Repository.ReversedWordRepository;
import martintk.sonadeloputood.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping("words")
    public List<Word> getWords() {
        return wordRepository.findAll();
    }
    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        if (word.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (word.getWord() == null || word.getWord().isBlank()) {
            throw new RuntimeException("ERROR_WORD_MISSING");
        }
        wordRepository.save(word);
        return wordRepository.findAll();
    }
    @GetMapping("wordends")
    public List<Character> getWordEnds() {
        List<Word> words = wordRepository.findAll();
        return words.stream().map(word -> word.getWord().charAt(word.getWord().length() - 1)).toList();
    }
    @GetMapping("wordlengths")
    public List<Integer> getWordLengths() {
        List<Word> words = wordRepository.findAll();
        return words.stream().map(word -> word.getWord().length()).toList();
    }
    @GetMapping("wordreverse")
    public List<String> getReverseWords() {
        List<Word> words = wordRepository.findAll();
        return words.stream().map(word -> new StringBuilder(word.getWord()).reverse().toString()).toList();
    }
    @Autowired
    ReversedWordRepository reversedWordRepository;
    @PostMapping("reversewords")
    public ResponseEntity<String> reverseSaveWord() {
        List<Word> words = wordRepository.findAll();
        for (Word word : words) {
            String reversed = new StringBuilder(word.getWord()).reverse().toString();
            ReversedWord reversedWord = new ReversedWord(reversed);
            reversedWordRepository.save(reversedWord);
        }
        return ResponseEntity.ok("Word reversed");
    }
    @GetMapping("reversewords")
    public List<ReversedWord> getReversedWords() {
        return reversedWordRepository.findAll();
    }
    @GetMapping("mostfrequentlastletter")
    public ResponseEntity<Character> getMostFrequentLastLetter() {
        List<Word> words = wordRepository.findAll();

        Map<Character, Long> frequencyMap = words.stream().map(word -> word.getWord().charAt(word.getWord().length() - 1)).collect(Collectors.groupingBy(c -> c, Collectors.counting()));

        char MostFrequent = frequencyMap.entrySet().stream().max(Comparator.comparingLong(Map.Entry::getValue)).map(Map.Entry::getKey).orElseThrow();

        return ResponseEntity.ok(MostFrequent);
    }
}
