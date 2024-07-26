package com.fibbo.fibbo.infraestructure;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fibbo.fibbo.domain.model.Todo;


public interface TodoRepository extends JpaRepository<Todo, Long> {
}
