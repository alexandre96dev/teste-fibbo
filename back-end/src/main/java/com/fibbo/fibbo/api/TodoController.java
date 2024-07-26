package com.fibbo.fibbo.api;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fibbo.fibbo.domain.model.Todo;
import com.fibbo.fibbo.domain.services.TodoService;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @GetMapping("/{id}/finish")
    public ResponseEntity<Object> finishTodo(@PathVariable Long id) {
        return todoService.finishTodo(id);
    }

    @PostMapping
    public ResponseEntity<Object> createTodo(@RequestBody Todo todoObject) {
        return todoService.create(todoObject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Todo>> getTodoById(@PathVariable Long id) {
        return todoService.getById(id);
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return todoService.getAll();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> updateTodo(@PathVariable Long id, @RequestBody Todo todoObject){
        return todoService.updateById(id, todoObject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTodoById(@PathVariable Long id) {
        return todoService.deleteById(id);  
    }
}
