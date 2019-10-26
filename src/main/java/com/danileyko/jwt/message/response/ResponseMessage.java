package com.danileyko.jwt.message.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.SafeHtml;

@Data
@AllArgsConstructor
public class ResponseMessage {
    private String message;
}
