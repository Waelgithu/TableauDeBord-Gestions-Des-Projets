package tn.stage._24.gestionproet24.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.stage._24.gestionproet24.entities.Task;

public interface TaskRepository extends JpaRepository<Task,Integer> {
}
