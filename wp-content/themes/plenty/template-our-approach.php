<?php
/*
Template Name: Our Approach
*/
?>

<?  load_approach_scripts(); ?>

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

			<div id="approach-sidebar">

				<div class="sidebar-section">

					<h3>WHAT MAKES US UNIQUE?</h3>

				</div>

				<div class="sidebar-section">

					<div class="arrow"></div>

					<div class="bubble">

						<p>Enable students to graduate from high school with up to two years of college credit.</p>

					</div>

				</div>

				<div class="sidebar-section">

					<div class="arrow"></div>

					<div class="bubble">

						<p>Schools are created and sustained through a deep and meaningful relationship with a CUNY College.</p>

					</div>

				</div>

				<div class="sidebar-section">

					<div class="arrow"></div>

					<div class="bubble">

						<p>Variety of school designs<br/>
							(6-12, 9-12, 9-13, 9-14, CTE)</p>

					</div>

				</div>

				<div class="sidebar-section sidebar-link">

					<div class="arrow"></div>

					<div class="bubble">

						<p>Learn more about ECI Design Principles.
							<br/>
							<a href="http://earlycollege.cuny.edu/pdf/eci-design-principles.pdf" target="_blank" class="download-pdf sro"><span class="a"></span><span class="b"></span></a>
						</p>

					</div>

					<div id="approach-bottom"></div>

				</div>

			</div>

			<div class="clearfix"></div>
			
		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>