<?php
/*
Template Name: Our Schools
*/
?>

<?php load_map_scripts(); ?>

<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			
			<h1 class="entry-title"><?php the_title(); ?></h1>

			<div class="entry-content">
				
				<?php the_content(); ?>

			</div>
			
		</article>

	<?php endwhile; endif; ?>

	<?php wp_reset_query(); ?>

	<?php query_posts('cat=2&nopaging=true'); ?>

	<?php if ( have_posts() ) : ?>

	<div id="map-section">

		<div id="school-list">

		<?php while ( have_posts() ) : the_post(); ?>		

			<div class="school-item">

			<?php

				echo '<div class="school-visible">';

				echo '<h3 class="school-name">' . get_the_title() . '</h3>';

				echo '<p class="school-address">' . get_post_meta(get_the_ID(), 'safe address', true) . '</p>';

				echo '<div class="school-partner"><strong>COLLEGE PARTNER:</strong> ' . get_post_meta(get_the_ID(), 'partner', true) . '</div>';

				echo '</div>';

				echo '<div class="school-hidden">';

				echo '<div class="school-grades"><strong>GRADES:</strong> ' . get_post_meta(get_the_ID(), 'grades', true) . '</div>';

				echo '<div class="school-link-section">';

				$temp = get_post_meta(get_the_ID(), 'pdf', true);

				if (!empty($temp)) {

					echo '<a href="' . get_post_meta(get_the_ID(), 'pdf', true) . '" target="_blank" class="school-pdf sro"><span class="a"></span><span class="b"></span></a>';	
				}

				$temp = get_post_meta(get_the_ID(), 'video', true);

				if (!empty($temp)) {

					echo '<a href="' . get_post_meta(get_the_ID(), 'video', true) . '" class="school-video sro"><span class="a"></span><span class="b"></span></a>';

				}

				echo '<div class="clearfix"></div></div>';

				echo '</div>';

				echo '<div class="school-lat">' . GeoMashup::location_info("fields=lat") . '</div>';

				echo '<div class="school-lng">' . GeoMashup::location_info("fields=lng") . '</div>';

				echo '<div class="infobox">';

				echo '<a href="javascript:void(0);" class="info-close"></a>';

				echo '<div class="school-real-name">' . get_the_title() . '</div>';

				echo '<p class="school-address">' . get_post_meta(get_the_ID(), 'safe address', true) . '</p>';

				echo '<img src="'. get_bloginfo('template_url') .'/images/map-marker.png" alt="" class="map-marker" />';

				echo '</div>';

			?>

				<a href="javascript:void(0);" class="school-more"><span class="fg a"></span><span class="fg b"></span><img class="bg a" src="<? bloginfo('template_url') ?>/images/our-schools-more-info-bg-a.png" alt="" /><img class="bg b" src="<? bloginfo('template_url') ?>/images/our-schools-more-info-bg-b.png" alt="" /></a>

				<a href="javascript:void(0);" class="school-close sro"><span class="a"></span><span class="b"></span></a>

				<div class="school-bottom"></div>

			</div>

		<?php endwhile; ?>

		</div>

		<div id="fixed-fix">

			<div id="map-wrap">

				<div id="map_canvas"></div>

			</div>

		</div>

		<div class="clearfix"></div>

	</div>

	<?php endif; ?>

<?php get_footer(); ?>
