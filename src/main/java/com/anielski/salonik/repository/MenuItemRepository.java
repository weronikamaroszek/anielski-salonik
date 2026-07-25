package com.anielski.salonik.repository;

import com.anielski.salonik.model.MenuItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for accessing MenuItem data.
 */
@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    /**
     * Returns all menu items sorted by display order.
     * Spring Data JPA generates the query automatically from the method name.
     */
    List<MenuItem> findAllByOrderByDisplayOrderAsc();
}