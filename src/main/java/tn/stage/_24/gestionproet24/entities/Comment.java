package tn.stage._24.gestionproet24.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private java.util.Date date;
    private String content;
    private String authorType;
    private String commentableType;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id")
    /*@JsonBackReference*/
    private User author;

    @ManyToOne
    @JoinColumn(name = "task_id")
    /*@JsonBackReference*/
    private Task task;
}
