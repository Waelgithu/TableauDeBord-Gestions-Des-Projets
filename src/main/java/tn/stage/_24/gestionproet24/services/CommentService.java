package tn.stage._24.gestionproet24.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.stage._24.gestionproet24.entities.Comment;
import tn.stage._24.gestionproet24.entities.Task;
import tn.stage._24.gestionproet24.entities.User;
import tn.stage._24.gestionproet24.repository.CommentRepository;
import tn.stage._24.gestionproet24.repository.TaskRepository;
import tn.stage._24.gestionproet24.repository.UserRepository;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(int id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(int id, Comment commentDetails) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setDate(commentDetails.getDate());
            comment.setContent(commentDetails.getContent());
            comment.setAuthorType(commentDetails.getAuthorType());
            comment.setCommentableType(commentDetails.getCommentableType());
            comment.setAuthor(commentDetails.getAuthor());
            comment.setTask(commentDetails.getTask());
            return commentRepository.save(comment);
        } else {
            throw new RuntimeException("Comment not found with id " + id);
        }
    }


    public Comment assignCommentToUser(int commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        comment.setAuthor(user);
        return commentRepository.save(comment);
    }

    public void deleteComment(int id) {
        commentRepository.deleteById(id);
    }

    private Comment assignComment (Comment comment, User user, Task task){
        comment.setAuthor(user);
        comment.setTask(task);
        return commentRepository.save(comment);
    }
    public Comment addCommentAndAssignToUserAndTask(Comment comment, Long userId, int taskId) {
        User user = userRepository.findById(userId).orElse(null);
        Task task = taskRepository.findById(taskId).orElse(null);

        if (user == null || task == null) {
            throw new IllegalArgumentException("User or Task not found");
        }

        comment.setAuthor(user);
        comment.setTask(task);
        return assignComment(comment, user, task);


    }
}
