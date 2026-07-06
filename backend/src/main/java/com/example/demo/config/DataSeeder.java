package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Role;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SystemUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(SystemUserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (userRepository.count() == 0) {

            userRepository.save(SystemUser.builder()
                    .id(1L)
                    .username("admin")
                    .email("admin@solarsync.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.SYSTEM_ADMINISTRATOR)
                    .build());

            userRepository.save(SystemUser.builder()
                    .id(2L)
                    .username("operator")
                    .email("operator@solarsync.com")
                    .password(passwordEncoder.encode("operator123"))
                    .role(Role.SOLAR_OPERATOR)
                    .build());

            userRepository.save(SystemUser.builder()
                    .id(3L)
                    .username("technician")
                    .email("technician@solarsync.com")
                    .password(passwordEncoder.encode("technician123"))
                    .role(Role.MAINTENANCE_TECHNICIAN)
                    .build());
        }
    }
}