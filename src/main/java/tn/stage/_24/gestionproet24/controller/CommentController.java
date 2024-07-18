package tn.stage._24.gestionproet24.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.stage._24.gestionproet24.entities.Comment;
import tn.stage._24.gestionproet24.services.CommentService;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/admin/api/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/GetAll")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable int id) {
        Optional<Comment> commentOptional = commentService.getCommentById(id);
        return commentOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /*@PostMapping("/Add")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }*/

    @PutMapping("/Update/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestBody Comment commentDetails) {
        try {
            Comment updatedComment = commentService.updateComment(id, commentDetails);
            return ResponseEntity.ok(updatedComment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable int id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/assignCommentToUser/{commentId}/{userId}")
    public Comment assignToCourse(@PathVariable("commentId") int commentId,
                                  @PathVariable("userId") Long userId) {
        return commentService.assignCommentToUser(commentId, userId);
    }

    /*@PutMapping("/addAndAssignToUserAndTask/{userId}/{taskId}")
    public Comment addAndAssignToUserAndTask(@RequestBody Comment comment,
                                                     @PathVariable("userId") Long userId,
                                                     @PathVariable("taskId") int taskId)
    {
        return  commentService.addCommentAndAssignToUserAndTask(comment,userId,taskId);
    }*/

    @PostMapping("/AddTest")
    public ResponseEntity<?> addComment(@RequestBody Map<String, Object> payload) {
        try {
            // Check if comment data is present
            Map<String, Object> commentMap = (Map<String, Object>) payload.get("comment");
            if (commentMap == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing comment data");
            }

            // Check if userId is present and convert to Long
            if (!payload.containsKey("userId") || !(payload.get("userId") instanceof Number)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid userId");
            }
            Long userId = ((Number) payload.get("userId")).longValue();

            // Check if taskId is present and convert to Integer
            if (!payload.containsKey("taskId") || !(payload.get("taskId") instanceof Number)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid taskId");
            }
            int taskId = ((Number) payload.get("taskId")).intValue();

            // Create a new Comment object
            Comment comment = new Comment();
            comment.setDate(new Date()); // Using current date for simplicity
            comment.setContent((String) commentMap.get("content"));
            comment.setAuthorType((String) commentMap.get("authorType"));
            comment.setCommentableType((String) commentMap.get("commentableType"));

            // Add the comment and assign it to the user and task
            Comment savedComment = commentService.addCommentAndAssignToUserAndTask(comment, userId, taskId);

            if (savedComment == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User or Task not found");
            }

            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
}
