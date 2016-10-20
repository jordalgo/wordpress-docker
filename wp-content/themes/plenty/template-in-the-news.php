<?php
/*
Template Name: Staff
*/
?>

<?php load_about_us_scripts(); ?>

<?php get_header(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			
			<h1 class="entry-title">About Us</h1>

			<div id="about-us-sidenav">

				<div><a  href="<?=get_site_url();?>/staff/" class="staff-nav">STAFF</a></div>

				<div><a  href="<?=get_site_url();?>/in-the-news/" class="news-nav">IN THE NEWS</a></div>

			</div>

				<?php wp_reset_query(); ?>

				<?php query_posts('cat=5'); ?>

				<?php if ( have_posts() ) : ?>

					<div id="news-section">

				<?php while ( have_posts() ) : the_post(); ?>

					<div class="news-item">

						<div class="news-logo">

							<div class="img-wrap">

						<?php if ( has_post_thumbnail() ) :?>

							<?php the_post_thumbnail(); ?>

						<?php endif; ?>

							</div>

						</div>

						<div class="news-info">

							<h3><?php the_date(); ?></h3>

							<h2><?php the_title(); ?></h2>

							<?php the_content(); ?>

							<a class="readmore" target="_blank" href="<?php echo get_post_meta(get_the_ID(), 'read more', true); ?>">READ MORE<span class="a"></span><span class="b"></span></a>

						</div>

					</div>

				<?php endwhile; ?>

					</div>

				<?php endif; ?>

			<div class="clearfix"></div>
			
		</article>

<?php get_footer(); ?>