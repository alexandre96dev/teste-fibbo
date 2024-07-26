package com.fibbo.fibbo.domain.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", length = 150)
    private String title;

    @Column(name = "completed")
    private boolean completed;

    @Column(name = "date_conclusion")
    private LocalDateTime  dateConclusion;
    
    public Todo(String title, LocalDateTime dateConclusion) {
        this.title = title;
        this.completed = false;
        this.dateConclusion = dateConclusion;
    }
}
