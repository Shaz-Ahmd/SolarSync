package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.SystemUser;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<SystemUser>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SystemUser> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(authService.getUserById(id));
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<SystemUser>> getUsersByRole(
            @PathVariable SystemUser.Role role) {

        return ResponseEntity.ok(authService.getUsersByRole(role));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        authService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}