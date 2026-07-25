package com.anielski.salonik.service;

import com.anielski.salonik.model.MenuItem;
import com.anielski.salonik.repository.MenuItemRepository;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Business logic for managing navigation menu items.
 */
@Service
public class MenuItemService {

    private final MenuItemRepository repository;

    public MenuItemService(MenuItemRepository repository) {
        this.repository = repository;
    }

    /**
     * Returns all menu items, sorted by display order.
     */
    public List<MenuItem> getAllMenuItems() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    /**
     * Saves a menu item (new or existing).
     */
    public MenuItem save(MenuItem item) {
        return repository.save(item);
    }

    /**
     * Deletes a menu item by its ID.
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }

    /**
     * Returns a single menu item by ID (used for edit form).
     */
    public MenuItem getById(Long id) {
        return repository.findById(id).orElseThrow(
            () -> new RuntimeException("Menu item not found: " + id)
        );
    }
}