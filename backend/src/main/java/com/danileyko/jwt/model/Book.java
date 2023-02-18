package com.danileyko.jwt.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_seq_gen")
    @SequenceGenerator(
            name = "book_seq_gen",
            sequenceName = "book_id_seq" ,
            initialValue = 1,
            allocationSize = 1
    )
    @Column(name = "id",updatable = false, nullable = false)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "isbn")
    private Integer isbn;
    @Column(name = "total_pages")
    private Integer totalPages;
    @Column(name = "pablished_date")
    @Temporal(TemporalType.DATE)
    private Date pablishedDate;
    @ManyToMany
    @JoinTable(
            name = "books_authors",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private List<Author> authors;
}
