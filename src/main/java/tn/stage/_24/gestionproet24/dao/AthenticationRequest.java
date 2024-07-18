package tn.stage._24.gestionproet24.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.stage._24.gestionproet24.entities.Grade;
import tn.stage._24.gestionproet24.entities.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AthenticationRequest {
    private String nom ;
    private String  username;
    private String email;
    private Role role;
    private Grade grade;
    private String  password;

}