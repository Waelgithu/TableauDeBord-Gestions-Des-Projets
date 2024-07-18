package tn.stage._24.gestionproet24.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.stage._24.gestionproet24.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
