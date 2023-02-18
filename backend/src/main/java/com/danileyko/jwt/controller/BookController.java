package com.danileyko.jwt.controller;

import com.danileyko.jwt.exception.EntityNotFoundByIdException;
import com.danileyko.jwt.message.request.BookIn;
import com.danileyko.jwt.model.Book;
import com.danileyko.jwt.service.impl.BookServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/book")
public class BookController {
    private final BookServiceImpl bookService;

    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        if (books.size() > 0) {
            return new ResponseEntity<>(books, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable("id") Long id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(value ->
                new ResponseEntity<>(value, HttpStatus.OK)
        ).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NO_CONTENT)
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Book> create(@RequestBody BookIn bookIn) {
        return new ResponseEntity<>(bookService.createBook(bookIn), HttpStatus.CREATED);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Book> update(@RequestBody BookIn bookIn) {
        return new ResponseEntity<>(bookService.updateBook(bookIn), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void removeBook(@PathVariable("id") Long id) {
        if(!bookService.isExistByID(id)) {
            throw new EntityNotFoundByIdException(MessageFormat.format("Entity with ID: {0} not found!", id));
        }
        bookService.removeBook(id);
    }
}
