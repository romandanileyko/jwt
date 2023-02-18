package com.danileyko.jwt.service;


import com.danileyko.jwt.message.request.BookIn;
import com.danileyko.jwt.model.Author;
import com.danileyko.jwt.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book createBook(BookIn book);
    Book updateBook(BookIn book);
    void removeBook(Long id);
    boolean isExistByID(Long id);
}
