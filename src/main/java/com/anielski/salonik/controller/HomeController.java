package com.anielski.salonik.controller;

import com.anielski.salonik.service.MenuItemService;
import com.anielski.salonik.service.SiteContentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller for the public home page.
 * Loads editable content and menu items from the database
 * so they can be rendered by Thymeleaf fragments.
 */
@Controller
public class HomeController {

    private final SiteContentService siteContentService;
    private final MenuItemService menuItemService;

    public HomeController(SiteContentService siteContentService,
                          MenuItemService menuItemService) {
        this.siteContentService = siteContentService;
        this.menuItemService = menuItemService;
    }

    @GetMapping("/")
    public String home(Model model) {
        // Load content edited via the admin panel.
        // If the DB is empty (first run), an empty SiteContent is returned - no crash.
        model.addAttribute("content", siteContentService.getSiteContent());
        model.addAttribute("menuItems", menuItemService.getAllMenuItems());
        return "index";
    }
}