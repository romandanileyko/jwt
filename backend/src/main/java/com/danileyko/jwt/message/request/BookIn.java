package com.danileyko.jwt.message.request;

import com.danileyko.jwt.model.Author;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class BookIn {
    private long id;
    private String title;
    private Integer isbn;
    private Integer totalPages;
    private Date pablishedDate;
    private List<Author> authors;
}
