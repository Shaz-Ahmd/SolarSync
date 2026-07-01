package com.example.demo.repository;

import javax.swing.text.html.parser.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SystemUser;

@Repository
public interface SystemUserRepository extends JpaRepository<Entity,Long>{
     Optional<SystemUser> findByUsername(String username);

    Optional<SystemUser> findByEmail(String email);
}
