<?php
/*
Template Name: Our Partners
*/
?>

<?php load_partners_scripts(); ?>

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

		<div id="partners-section">

		<div class="dotted-border-x"></div>

		<?php

			$mypages = get_pages( array( 'child_of' => $post->ID, 'sort_column' => 'post_date', 'sort_order' => 'asc' ) );

			foreach( $mypages as $page ) {

				$content = $page->post_content;

				/*if ( ! $content ) // Check for empty page

					continue;*/

				$content = apply_filters( 'the_content', $content );

			?>

				<div class="partner-item">

					<h2>

						<a href="javascript:void(0);"><span class="a"></span><span class="b"></span><?php echo $page->post_title; ?></a>
					</h2>

					<div class="partner-entry">

						<?php echo $content; ?>

					</div>

					<div class="dotted-border-x"></div>

				</div>

			<?php

			}

		?>

	</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>