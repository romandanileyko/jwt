package com.danileyko.jwt.controller;

import com.danileyko.jwt.message.request.AuthorIn;
import com.danileyko.jwt.model.Author;
import com.danileyko.jwt.service.impl.AuthorServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/author")
public class AuthorController {
    private final AuthorServiceImpl authorService;

    public AuthorController(AuthorServiceImpl authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        if(authors.size() > 0) {
            return new ResponseEntity<>(authors, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(authors, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") Long id) {
        Optional<Author> author = authorService.getAuthorById(id);
        return author.map(
                value -> new ResponseEntity<>(value, HttpStatus.OK)
        ).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NO_CONTENT)
        );
    }

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody AuthorIn authorIn) {
        return new ResponseEntity<>(authorService.createAuthor(authorIn), HttpStatus.CREATED);
    }
}
