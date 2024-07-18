package tn.stage._24.gestionproet24.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String description;
    private Status status;
    private java.util.Date startDate;
    private java.util.Date endDate;
    private String priority;
    private String type;
    private float budget;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Task> tasks;

    @ManyToMany(mappedBy = "projects", cascade = CascadeType.ALL)
    private Set<User> users;
}
