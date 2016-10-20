<?php
/*
Template Name: Resources
*/
?>

<?php load_resources_scripts(); ?>

<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<? if ( has_post_thumbnail() ) :?>

				<div id="blue-wrapper">

					<div id="blue-section">

						<h1><?php the_title(); ?></h1>

						<div id="featured-image">

							<? the_post_thumbnail(); ?>

						</div>

					</div>

				</div>

				<div id="home-border"></div>

		<? endif; ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<? if ( !has_post_thumbnail() ) :?>

			<h1 class="entry-title"><?php the_title(); ?></h1>

			<? endif; ?>

			<div class="entry-content">
				
				<?php the_content(); ?>

			</div>
			
		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>