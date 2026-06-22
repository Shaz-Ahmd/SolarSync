package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Table(name = "system_users");
@Data

public class SystemUser {
    @Id
    @GeneratedValue(stratergy = GenerationType.IDENTITY)
    private Long id;

    public SystemUser(Long id) {
        this.id = id;
    }
}
