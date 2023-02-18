package com.danileyko.jwt.service.impl;

import com.danileyko.jwt.exception.EntityNotFoundByIdException;
import com.danileyko.jwt.message.request.BookIn;
import com.danileyko.jwt.model.Author;
import com.danileyko.jwt.model.Book;
import com.danileyko.jwt.repository.BookRepository;
import com.danileyko.jwt.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book createBook(BookIn bookIn) {
        Book book = new Book();
        List<Author> authors = bookIn.getAuthors();
        book.setTitle(bookIn.getTitle());
        book.setIsbn(bookIn.getIsbn());
        book.setTotalPages(bookIn.getTotalPages());
        book.setPablishedDate(bookIn.getPablishedDate());
        book.setAuthors(authors);
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(BookIn bookIn) {
        Book book = bookRepository.findById(bookIn.getId())
                .orElseThrow(() -> new EntityNotFoundByIdException("Entity not Found!"));
        book.setTitle(bookIn.getTitle());
        book.setIsbn(bookIn.getIsbn());
        book.setTotalPages(bookIn.getTotalPages());
        book.setPablishedDate(bookIn.getPablishedDate());
        book.setAuthors(bookIn.getAuthors());
        return bookRepository.save(book);
    }

    @Override
    public void removeBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public boolean isExistByID(Long id) {
        return bookRepository.existsById(id);
    }
}
