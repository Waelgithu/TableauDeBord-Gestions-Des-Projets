package tn.stage._24.gestionproet24.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.stage._24.gestionproet24.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
}
