<?php
/*
Template Name: Staff
*/
?>

<?php load_staff_scripts(); ?>

<?php get_header(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			
			<h1 class="entry-title">About Us</h1>

			<div id="about-us-sidenav">

				<div><a  href="<? echo get_site_url();?>/staff/" class="staff-nav">STAFF</a></div>

				<div><a  href="<?echo get_site_url();?>/in-the-news/" class="news-nav">IN THE NEWS</a></div>

			</div>

				<?php wp_reset_query(); ?>

				<?php query_posts('cat=4'); ?>

				<?php if ( have_posts() ) : ?>

					<div id="staff-section">

				<?php while ( have_posts() ) : the_post(); ?>

					<div class="staff-item">

						<h2><?php the_title(); ?></h2>

						<h3><? echo get_post_meta(get_the_ID(), 'title', true); ?></h3>

						<? the_content(); ?>

					</div>

				<?php endwhile; ?>

					</div>

				<?php endif; ?>


			<div class="clearfix"></div>
			
		</article>

<?php get_footer(); ?>