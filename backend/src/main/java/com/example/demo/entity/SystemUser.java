package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "system_users")
public class SystemUser {
    @Id
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column()
}
