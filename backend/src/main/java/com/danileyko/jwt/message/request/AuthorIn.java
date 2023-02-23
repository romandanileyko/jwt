package com.danileyko.jwt.message.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AuthorIn {
    private Long id;
    private String firstName;
    private String lastName;
    private Date birthDate;
}
