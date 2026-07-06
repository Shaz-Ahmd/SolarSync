package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Role;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final SystemUserRepository userRepository;

    public UserController(SystemUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/technicians")
    @PreAuthorize("hasAuthority('SYSTEM_ADMINISTRATOR')")
    public ResponseEntity<List<SystemUser>> getTechnicians() {

        return ResponseEntity.ok(
                userRepository.findAll()
                        .stream()
                        .filter(user -> user.getRole() == Role.MAINTENANCE_TECHNICIAN)
                        .toList());
    }
}