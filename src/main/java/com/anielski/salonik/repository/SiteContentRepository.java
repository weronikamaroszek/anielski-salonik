package com.anielski.salonik.repository;

import com.anielski.salonik.model.SiteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for accessing SiteContent data in the database.
 * Extending JpaRepository gives us basic CRUD methods for free:
 * - save(entity)
 * - findById(id)
 * - findAll()
 * - deleteById(id)
 * ...and more.
 */
@Repository
public interface SiteContentRepository extends JpaRepository<SiteContent, Long> {
}