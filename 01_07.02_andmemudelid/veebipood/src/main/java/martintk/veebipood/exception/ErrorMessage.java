package martintk.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data // tema sees
public class ErrorMessage {
    private String message; // klass --> null
    private Date timestamp; // klass --> null
    private Integer status; // int --> 0 double 0.0
    //boolean --> false
}
