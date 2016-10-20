<?php
/*
Template Name: Contact Us
*/
?>

<?php load_contact_scripts(); ?>

<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

				<div id="blue-wrapper">

					<div id="blue-section">

						<h1><?php the_title(); ?></h1>

						<div id="featured-image">

							<div id="map_canvas"></div>

						</div>

					</div>

				</div>

				<div id="home-border"></div>


		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<div class="entry-content">
				
				<div id="contact-section">

					<div class="address">

						<div class="centered">

							CUNY Early College Initiative<br/>
							16 Court Street, 3rd Floor<br/>
							Brooklyn, NY 11201

						</div>

					</div>

					<div class="email">

						<div class="centered">

							<a href="mailto:eci@mail.cuny.edu">eci@mail.cuny.edu<span class="a"></span><span class="b"></span></a>

						</div>

					</div>

					<div class="facebook">

						<div class="centered">

							<a href="https://www.facebook.com/ecicuny" target="_blank">Facebook<span class="a"></span><span class="b"></span></a>

						</div>

					</div>
                    
                    <div class="twitter">

						<div class="centered">

							<a href="https://twitter.com/ecicuny" target="_blank">Twitter<span class="a"></span><span class="b"></span></a>

						</div>

					</div>

					<div class="youtube">

						<div class="centered">

							<a href="https://www.youtube.com/ecicuny" target="_blank">YouTube<span class="a"></span><span class="b"></span></a>

						</div>

					</div>

				</div>

			</div>
			
		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>