<?php
/**
 * SignaalBewaking theme functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'SB_VERSION', '2.8.0' );
define( 'SB_DIR', get_template_directory() );
define( 'SB_URI', get_template_directory_uri() );

/**
 * Theme setup
 */
function sb_setup() {
    add_theme_support( 'wp-block-template-parts' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'editor-styles' );

    register_nav_menus( [
        'primary'   => __( 'Hoofdmenu', 'signaalbewaking' ),
        'footer'    => __( 'Footermenu', 'signaalbewaking' ),
    ] );
}
add_action( 'after_setup_theme', 'sb_setup' );

/**
 * Enqueue styles and scripts
 */
function sb_enqueue_assets() {
    // Main theme stylesheet
    wp_enqueue_style(
        'sb-main',
        SB_URI . '/assets/css/main.css',
        [],
        SB_VERSION
    );

    // Mobile menu + smooth scroll
    wp_enqueue_script(
        'sb-main',
        SB_URI . '/assets/js/main.js',
        [],
        SB_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'sb_enqueue_assets' );

/**
 * Custom Walker for primary nav — adds dropdown support
 */
class SB_Nav_Walker extends Walker_Nav_Menu {
    public function start_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '<ul class="sb-dropdown">';
    }
    public function end_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '</ul>';
    }
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = implode( ' ', $item->classes ?? [] );
        $has_children = in_array( 'menu-item-has-children', $item->classes ?? [] );
        $output .= '<li class="sb-nav-item ' . esc_attr( $classes ) . '">';
        $attrs = 'href="' . esc_url( $item->url ) . '"';
        if ( $has_children ) {
            $attrs .= ' aria-haspopup="true" aria-expanded="false"';
        }
        $output .= '<a ' . $attrs . ' class="sb-nav-link">';
        $output .= esc_html( $item->title );
        if ( $has_children ) {
            $output .= ' <svg class="sb-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4.5L6 7.5L9 4.5"/></svg>';
        }
        $output .= '</a>';
    }
}

/**
 * Schema.org LocalBusiness JSON-LD
 */
function sb_schema_markup() {
    if ( ! is_admin() ) {
        $schema = [
            '@context'  => 'https://schema.org',
            '@type'     => 'LocalBusiness',
            'name'      => 'SignaalBewaking',
            'url'       => 'https://signaalbewaking.nl',
            'telephone' => '+31881199911',
            'email'     => 'info@signaalbewaking.nl',
            'address'   => [
                '@type'            => 'PostalAddress',
                'streetAddress'    => 'Vendelier 71',
                'postalCode'       => '3905 PD',
                'addressLocality'  => 'Veenendaal',
                'addressCountry'   => 'NL',
            ],
            'openingHours' => 'Mo-Su 00:00-23:59',
            'priceRange'   => '€€',
            'sameAs'       => [],
        ];

        // Add Service schema on service pages
        if ( is_page( [ 'meldkamerdiensten', 'alarmopvolging', 'cameratoezicht' ] ) ) {
            $schema['@type'] = ['LocalBusiness', 'SecurityService'];
        }

        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
    }
}
add_action( 'wp_head', 'sb_schema_markup' );

/**
 * Remove unnecessary WordPress bloat
 */
function sb_cleanup() {
    remove_action( 'wp_head', 'wp_generator' );
    remove_action( 'wp_head', 'wlwmanifest_link' );
    remove_action( 'wp_head', 'rsd_link' );
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'sb_cleanup' );

/**
 * Disable global styles for performance
 */
function sb_dequeue_global_styles() {
    wp_dequeue_style( 'classic-theme-styles' );
}
add_action( 'wp_enqueue_scripts', 'sb_dequeue_global_styles', 20 );

/**
 * Preload hero image for LCP
 */
function sb_preload_hero() {
    if ( is_front_page() ) {
        echo '<link rel="preload" as="image" href="' . esc_url( SB_URI . '/assets/images/hero-home.jpg' ) . '">' . "\n";
    }
}
add_action( 'wp_head', 'sb_preload_hero', 1 );
