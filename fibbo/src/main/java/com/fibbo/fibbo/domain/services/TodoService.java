package com.fibbo.fibbo.domain.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.fibbo.fibbo.domain.model.Todo;
import com.fibbo.fibbo.infraestructure.TodoRepository;
import com.fibbo.fibbo.response.ResponseBody;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    
    @PersistenceContext
    private EntityManager entityManager;


    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional
    public ResponseEntity<Object> finishTodo(Long id) {
        if (todoRepository.existsById(id)) {
            LocalDateTime now = LocalDateTime.now();
            Todo todo = entityManager.find(Todo.class, id);
            todo.setCompleted(true);
            todo.setDateConclusion(now);
            ResponseBody responseBody = new ResponseBody();
            responseBody.setMessage("tarefa concluída com sucesso");
            return ResponseEntity.ok(responseBody);
        }
        ResponseBody responseBody = new ResponseBody();
        responseBody.setMessage("Esta tarefa não existe");
        return ResponseEntity.badRequest().body(responseBody);
    }

    @Transactional
    public ResponseEntity<Object> create(Todo todoObject) {
        try {
            Todo todo = todoRepository.save(todoObject);

            if (todoObject.isCompleted()) {
                Todo updateDateConclusion = entityManager.find(Todo.class, todo.getId());
                LocalDateTime now = LocalDateTime.now();
                updateDateConclusion.setDateConclusion(now);
            }
            return ResponseEntity.ok(todoObject);
        } catch (Exception e) {
            ResponseBody responseBody = new ResponseBody();
            responseBody.setMessage("Houve um erro :"+ e.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        }
    }

    public ResponseEntity<Optional<Todo>> getById(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            return ResponseEntity.ok(todo);
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<List<Todo>> getAll() {
        List<Todo> todoList = todoRepository.findAll();
        if (!todoList.isEmpty()) {
            return ResponseEntity.ok(todoList);
        }
        return ResponseEntity.notFound().build();
    }

    @Transactional
    public ResponseEntity<Object> updateById(Long id, Todo todoObject) {
        if (todoRepository.existsById(id)) {
            Todo todo = entityManager.find(Todo.class, id);
            todo.setTitle(todoObject.getTitle());
            todo.setCompleted(todoObject.isCompleted());
            if (!todoObject.isCompleted()) {
                todo.setDateConclusion(null);
            } else {
                LocalDateTime now = LocalDateTime.now();
                todo.setDateConclusion(now);
            }
            
            return ResponseEntity.ok(todo);
        }
        ResponseBody responseBody = new ResponseBody();
        responseBody.setMessage("Esta tarefa não existe");
        return ResponseEntity.badRequest().body(responseBody);
    }

    public ResponseEntity<Object> deleteById(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            ResponseBody responseBody = new ResponseBody();
            responseBody.setMessage("Tarefa excluída com sucesso");
            return ResponseEntity.ok(responseBody);
        }
        ResponseBody responseBody = new ResponseBody();
        responseBody.setMessage("Esta tarefa não existe");
        return ResponseEntity.badRequest().body(responseBody);
    }

}
