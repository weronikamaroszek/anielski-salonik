package com.anielski.salonik.service;

import com.anielski.salonik.model.SiteContent;
import com.anielski.salonik.repository.SiteContentRepository;
import org.springframework.stereotype.Service;

/**
 * Business logic for managing site content (Hero section, Footer).
 * Since we only ever have ONE row in the site_content table,
 * this service handles the "singleton row" pattern.
 *
 * NOTE: Initial content must be filled in through the admin panel at /admin/layout.
 * No default texts are hardcoded here - all editable content lives in the database.
 */
@Service
public class SiteContentService {

    private final SiteContentRepository repository;

    public SiteContentService(SiteContentRepository repository) {
        this.repository = repository;
    }

    /**
     * Returns the current site content, or an empty (non-persisted) SiteContent
     * if the table is empty. This prevents NullPointerException on first run
     * before the admin has filled anything.
     */
    public SiteContent getSiteContent() {
        return repository.findAll().stream()
                .findFirst()
                .orElseGet(SiteContent::new);
    }

    /**
     * Returns true if any site content exists in the database.
     */
    public boolean hasContent() {
        return repository.count() > 0;
    }

    /**
     * Saves updated site content.
     */
    public SiteContent save(SiteContent content) {
        return repository.save(content);
    }
}