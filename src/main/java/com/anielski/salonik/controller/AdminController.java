package com.anielski.salonik.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller handling general admin panel routes.
 * Login page and root redirect are here; specific tabs
 * (like /admin/layout) have their own controllers.
 */
@Controller
public class AdminController {

    // Displays the login form
    @GetMapping("/admin/login")
    public String login() {
        return "admin/login";
    }

    // Redirects /admin to the Layout tab (default dashboard view)
    @GetMapping("/admin")
    public String dashboard() {
        return "redirect:/admin/layout";
    }
}