package com.danileyko.jwt.service.impl;

import com.danileyko.jwt.message.request.AuthorIn;
import com.danileyko.jwt.model.Author;
import com.danileyko.jwt.repository.AuthorRepository;
import com.danileyko.jwt.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> getAuthorById(long id) {
        return authorRepository.findById(id);
    }

    @Override
    public Author createAuthor(AuthorIn authorIn) {
        Author author = new Author();
        author.setFirstName(authorIn.getFirstName());
        author.setLastName(authorIn.getLastName());
        author.setBirthDate(authorIn.getBirthDate());
        return authorRepository.save(author);
    }
}
