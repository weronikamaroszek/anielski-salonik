package com.anielski.salonik.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a single item in the site's main navigation menu.
 * Each row = one link (e.g. "Strona główna" -> "/").
 */
@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Text shown on the menu link (e.g. "Strona główna")
    @Column(name = "label", length = 100, nullable = false)
    private String label;

    // Target URL or anchor (e.g. "/", "/uslugi", "#o-nas")
    @Column(name = "url", length = 200, nullable = false)
    private String url;

    // Display order (1 = first, 2 = second, ...)
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    // If true, this item is styled as the primary CTA button (e.g. "Umów wizytę")
    @Column(name = "is_button", nullable = false)
    private Boolean isButton = false;

    // ===== Getters and Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Boolean getIsButton() {
        return isButton;
    }

    public void setIsButton(Boolean isButton) {
        this.isButton = isButton;
    }
}