package com.danileyko.jwt.service;

import com.danileyko.jwt.message.request.AuthorIn;
import com.danileyko.jwt.model.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> getAllAuthors();
    Optional<Author> getAuthorById(long id);
    Author createAuthor(AuthorIn authorIn);
}
