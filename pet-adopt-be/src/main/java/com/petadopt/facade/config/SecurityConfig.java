package com.petadopt.facade.config;

import java.util.Optional;

import com.petadopt.persistance.entity.UserEntity;
import com.petadopt.persistance.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/user/register", "/user/login", "/images/**", "/pets", "/association/**",
                    "/messages/**").permitAll() // Public endpoints
                .requestMatchers("/pets/addPet/**").hasRole("USER")
                .requestMatchers("/association/add/**").hasRole("USER")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/**").authenticated()
                .anyRequest().authenticated())
            .cors(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> {
            Optional<UserEntity> dbUser = userRepository.findByUserName(username);
            if (dbUser.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }
            if (dbUser.get().getUserName().equalsIgnoreCase(username)) {
                return org.springframework.security.core.userdetails.User.withUsername(username)
                    .password(dbUser.get().getPassword())
                    .roles(dbUser.get().getUserRole().getRole())
                    .build();
            }
            throw new UsernameNotFoundException("User not found");
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
