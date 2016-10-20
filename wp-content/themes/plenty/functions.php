<?php
        // Translations can be filed in the /languages/ directory
        load_theme_textdomain( 'html5reset', TEMPLATEPATH . '/languages' );
 
        $locale = get_locale();
        $locale_file = TEMPLATEPATH . "/languages/$locale.php";
        if ( is_readable($locale_file) )
            require_once($locale_file);
	
	// Add RSS links to <head> section
	automatic_feed_links();
	
	// Load jQuery
	if ( !function_exists(core_mods) ) {
		function core_mods() {
			if ( !is_admin() ) {
				wp_deregister_script('jquery');
				wp_register_script('jquery', "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", false, false);
				wp_enqueue_script('jquery');
                wp_register_script('jquery_color', get_bloginfo('template_url') . "/_/js/jquery.color.js", array('jquery'));
                wp_enqueue_script('jquery_color');
                wp_register_script('functions_js', get_bloginfo('template_url') . "/_/js/functions.js", array('jquery'));
                wp_enqueue_script('functions_js');
			}
		}
		core_mods();
	}

    function load_home_scripts() {
        if ( !is_admin() ) {
            wp_register_script('home_script', get_bloginfo('template_url') . "/_/js/home.js", array('jquery'));
            wp_enqueue_script('home_script');
        }
    }

    function load_approach_scripts() {
        if ( !is_admin() ) {
            wp_register_script('approach_script', get_bloginfo('template_url') . "/_/js/approach.js", array('jquery'));
            wp_enqueue_script('approach_script');
        }
    }

    function load_map_scripts() {
        if ( !is_admin() ) {
            wp_register_script('google_maps_api', "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzpr0RM6ENxezRY2mhSS3obaJo6Nstws8&sensor=false", false, '1.0', true);
            wp_enqueue_script('google_maps_api');
            wp_register_script('infobox_plugin', get_bloginfo('template_url') . '/_/js/infobox.js', array('google_maps_api'), '1.0', true);
            wp_enqueue_script('infobox_plugin');
            wp_register_script('map', get_bloginfo('template_url') . "/_/js/map.js", array('google_maps_api', 'jquery', 'infobox_plugin'), '1.0', 'true');
            wp_enqueue_script('map');
        }
    }

    function load_partners_scripts() {
        if ( !is_admin() ) {
            wp_register_script('partners_script', (get_bloginfo('template_url') . "/_/js/partners.js"), array('jquery'));
            wp_enqueue_script('partners_script');
        }
    }

    function load_results_scripts() {
        if ( !is_admin() ) {
            wp_register_script('results_script', (get_bloginfo('template_url') . "/_/js/results.js"), array('jquery'));
            wp_enqueue_script('results_script');
        }
    }

    function load_resources_scripts() {
        if ( !is_admin() ) {
            wp_register_script('resources_script', (get_bloginfo('template_url') . "/_/js/resources.js"), array('jquery'));
            wp_enqueue_script('resources_script');
        }
    }

    function load_get_involved_scripts() {
        if ( !is_admin() ) {
            wp_register_script('get_involved_script', (get_bloginfo('template_url') . "/_/js/get-involved.js"), array('jquery'));
            wp_enqueue_script('get_involved_script');
        }
    }

    function load_about_us_scripts() {
        if ( !is_admin() ) {
            wp_register_script('staff_script', (get_bloginfo('template_url') . "/_/js/about-us.js"), array('jquery'));
            wp_enqueue_script('staff_script');
        }
    }

    function load_contact_scripts() {
        if ( !is_admin() ) {
            wp_register_script('google_maps_api', ("https://maps.googleapis.com/maps/api/js?key=AIzaSyDzpr0RM6ENxezRY2mhSS3obaJo6Nstws8&sensor=false"), false);
            wp_enqueue_script('google_maps_api');
            wp_register_script('contact_script', (get_bloginfo('template_url') . "/_/js/contact.js"), array('jquery', 'google_maps_api'));
            wp_enqueue_script('contact_script');
        }
    }



	// Clean up the <head>
	function removeHeadLinks() {
    	remove_action('wp_head', 'rsd_link');
    	remove_action('wp_head', 'wlwmanifest_link');
    }
    add_action('init', 'removeHeadLinks');
    remove_action('wp_head', 'wp_generator');
    
    if (function_exists('register_sidebar')) {
    	register_sidebar(array(
    		'name' => __('Sidebar Widgets','html5reset' ),
    		'id'   => 'sidebar-widgets',
    		'description'   => __( 'These are widgets for the sidebar.','html5reset' ),
    		'before_widget' => '<div id="%1$s" class="widget %2$s">',
    		'after_widget'  => '</div>',
    		'before_title'  => '<h2>',
    		'after_title'   => '</h2>'
    	));
    }
    
    add_theme_support( 'post-formats', array('aside', 'gallery', 'link', 'image', 'quote', 'status', 'audio', 'chat', 'video')); // Add 3.1 post format theme support.
    add_theme_support( 'post-thumbnails' ); 


?>