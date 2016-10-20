<?php
/*
Template Name: Homepage
*/
?>

<?php load_home_scripts(); ?>

<?php get_header(); ?>
	
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div id="blue-wrapper">

			<div id="blue-section">

				<? do_action('jfc_gallery'); ?>

			</div>
			
		</div>

		<div id="home-border"></div>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			
			<div class="entry-content">
				
				<?php the_content(); ?>

			</div>
			
		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>