package com.petadopt.facade.controller;

import java.util.List;

import com.petadopt.facade.model.UserModel;
import com.petadopt.service.AdminService;
import com.petadopt.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    public AdminController(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @PutMapping("/activate/{userId}")
    public void activateUser(@PathVariable("userId") Long userId) {
        adminService.activateUser(userId);

    }

    @PutMapping("/deactivate/{userId}")
    public void deActivateUser(@PathVariable("userId") Long userId) {
        adminService.deActivateUser(userId);

    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
