package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.SystemUser;

@Repository
public interface SystemUserRepository extends JpaRepository<SystemUser,Long>{
    Optional<SystemUser> findByUsername(String username);
    Optional<SystemUser> findByEmail(String email);
    List<SystemUser> findByRole(Role role);


}
