<?php
/**
 * Theme Functions
 * Handle dark mode and theme preferences
 */

/**
 * Get current theme
 */
function get_theme() {
    return $_COOKIE['theme'] ?? 'light';
}

/**
 * Is dark mode
 */
function is_dark_mode() {
    return get_theme() === 'dark';
}

/**
 * Theme class
 */
function theme_class() {
    return is_dark_mode() ? 'dark' : '';
}
