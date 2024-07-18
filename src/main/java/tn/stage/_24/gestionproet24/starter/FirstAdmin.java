package tn.stage._24.gestionproet24.starter;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tn.stage._24.gestionproet24.entities.Role;
import tn.stage._24.gestionproet24.entities.User;
import tn.stage._24.gestionproet24.repository.UserRepository;

@Component
@AllArgsConstructor
public class FirstAdmin {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initAdmin() {
        try{
            var user = User.builder()
                    .username("Wael Ben Rejeb")
                    .password(passwordEncoder.encode("RjabRjab"))
                    .email("WaelBenRejeb.wbr@gmail.com")
                    .role(Role.ADMIN)
                    .worken(Boolean.TRUE)
                    .build();
            userRepository.save(user);
        }catch (Exception e){
            System.out.println("The admin account already exist.");
        }

    }
}
