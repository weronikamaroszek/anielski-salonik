package com.anielski.salonik.controller;

import com.anielski.salonik.model.MenuItem;
import com.anielski.salonik.model.SiteContent;
import com.anielski.salonik.service.MenuItemService;
import com.anielski.salonik.service.SiteContentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller for the Layout tab in the admin panel.
 * Handles Hero section, Footer and Menu items management.
 */
@Controller
@RequestMapping("/admin/layout")
public class AdminLayoutController {

    private final SiteContentService siteContentService;
    private final MenuItemService menuItemService;

    public AdminLayoutController(SiteContentService siteContentService,
                                 MenuItemService menuItemService) {
        this.siteContentService = siteContentService;
        this.menuItemService = menuItemService;
    }

    /**
     * Displays the Layout form with Hero, Menu items and Footer.
     * GET /admin/layout
     */
    @GetMapping
    public String showLayoutForm(Model model) {
        // Returns existing content or an empty SiteContent if table is empty.
        // The empty object lets the form render with blank fields so admin can fill them in.
        model.addAttribute("content", siteContentService.getSiteContent());
        model.addAttribute("menuItems", menuItemService.getAllMenuItems());
        model.addAttribute("newMenuItem", new MenuItem());
        model.addAttribute("activeTab", "layout");
        model.addAttribute("isFirstRun", !siteContentService.hasContent());
        return "admin/layout";
    }

    /**
     * Saves Hero + Footer section content.
     * POST /admin/layout/content
     */
    @PostMapping("/content")
    public String saveContent(@ModelAttribute("content") SiteContent content) {
        siteContentService.save(content);
        return "redirect:/admin/layout?saved";
    }

    /**
     * Adds a new menu item.
     * POST /admin/layout/menu/add
     */
    @PostMapping("/menu/add")
    public String addMenuItem(@ModelAttribute("newMenuItem") MenuItem item) {
        // Auto-assign display order (add to the end of the list)
        int currentCount = menuItemService.getAllMenuItems().size();
        item.setDisplayOrder(currentCount + 1);
        if (item.getIsButton() == null) {
            item.setIsButton(false);
        }
        menuItemService.save(item);
        return "redirect:/admin/layout?saved";
    }

    /**
     * Updates an existing menu item.
     * POST /admin/layout/menu/edit/{id}
     */
    @PostMapping("/menu/edit/{id}")
    public String editMenuItem(@PathVariable Long id,
                               @ModelAttribute("menuItem") MenuItem submitted) {
        MenuItem existing = menuItemService.getById(id);
        existing.setLabel(submitted.getLabel());
        existing.setUrl(submitted.getUrl());
        existing.setIsButton(submitted.getIsButton() != null && submitted.getIsButton());
        menuItemService.save(existing);
        return "redirect:/admin/layout?saved";
    }

    /**
     * Deletes a menu item by ID.
     * POST /admin/layout/menu/delete/{id}
     */
    @PostMapping("/menu/delete/{id}")
    public String deleteMenuItem(@PathVariable Long id) {
        menuItemService.delete(id);
        return "redirect:/admin/layout?saved";
    }
}