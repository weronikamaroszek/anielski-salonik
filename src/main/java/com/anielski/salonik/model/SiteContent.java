package com.anielski.salonik.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents editable site content (Hero section, Footer).
 * There is only ONE row in this table - the current site content.
 */
@Entity
@Table(name = "site_content")
public class SiteContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== HERO SECTION =====

    // Small subtitle above the main title (e.g. "SALON PIELĘGNACJI ZWIERZĄT")
    @Column(name = "hero_subtitle", length = 200)
    private String heroSubtitle;

    // Main title - line 1 (e.g. "Spa i styl dla")
    @Column(name = "hero_title", length = 200)
    private String heroTitle;

    // Main title - line 2, gold color (e.g. "Twojego pupila")
    @Column(name = "hero_title_gold", length = 200)
    private String heroTitleGold;

    // Description text below the title
    @Column(name = "hero_description", length = 500)
    private String heroDescription;

    // Text on the primary button (e.g. "Umów wizytę")
    @Column(name = "hero_button_text", length = 100)
    private String heroButtonText;

    // Phone number shown on the secondary button
    @Column(name = "hero_phone", length = 30)
    private String heroPhone;

    // Three small badges below buttons
    @Column(name = "hero_badge_1", length = 50)
    private String heroBadge1;

    @Column(name = "hero_badge_2", length = 50)
    private String heroBadge2;

    @Column(name = "hero_badge_3", length = 50)
    private String heroBadge3;

    // Path or URL to the hero background image
    // Examples: "/images/hero-bg.png" (bundled), "/uploads/hero/xxx.jpg" (user-uploaded)
    @Column(name = "hero_background_image", length = 500)
    private String heroBackgroundImage;

    // ===== FOOTER SECTION =====

    // Copyright text (e.g. "© 2025 Anielski Salonik. Wszystkie prawa zastrzeżone.")
    @Column(name = "footer_copyright", length = 300)
    private String footerCopyright;

    // Phone number displayed in footer
    @Column(name = "footer_phone", length = 30)
    private String footerPhone;

    // Facebook page URL
    @Column(name = "footer_facebook_url", length = 500)
    private String footerFacebookUrl;

    // ===== Getters and Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeroSubtitle() {
        return heroSubtitle;
    }

    public void setHeroSubtitle(String heroSubtitle) {
        this.heroSubtitle = heroSubtitle;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroTitleGold() {
        return heroTitleGold;
    }

    public void setHeroTitleGold(String heroTitleGold) {
        this.heroTitleGold = heroTitleGold;
    }

    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }

    public String getHeroButtonText() {
        return heroButtonText;
    }

    public void setHeroButtonText(String heroButtonText) {
        this.heroButtonText = heroButtonText;
    }

    public String getHeroPhone() {
        return heroPhone;
    }

    public void setHeroPhone(String heroPhone) {
        this.heroPhone = heroPhone;
    }

    public String getHeroBadge1() {
        return heroBadge1;
    }

    public void setHeroBadge1(String heroBadge1) {
        this.heroBadge1 = heroBadge1;
    }

    public String getHeroBadge2() {
        return heroBadge2;
    }

    public void setHeroBadge2(String heroBadge2) {
        this.heroBadge2 = heroBadge2;
    }

    public String getHeroBadge3() {
        return heroBadge3;
    }

    public void setHeroBadge3(String heroBadge3) {
        this.heroBadge3 = heroBadge3;
    }

    public String getHeroBackgroundImage() {
        return heroBackgroundImage;
    }

    public void setHeroBackgroundImage(String heroBackgroundImage) {
        this.heroBackgroundImage = heroBackgroundImage;
    }

    public String getFooterCopyright() {
        return footerCopyright;
    }

    public void setFooterCopyright(String footerCopyright) {
        this.footerCopyright = footerCopyright;
    }

    public String getFooterPhone() {
        return footerPhone;
    }

    public void setFooterPhone(String footerPhone) {
        this.footerPhone = footerPhone;
    }

    public String getFooterFacebookUrl() {
        return footerFacebookUrl;
    }

    public void setFooterFacebookUrl(String footerFacebookUrl) {
        this.footerFacebookUrl = footerFacebookUrl;
    }
}