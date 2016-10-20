<?php
/*
Template Name: Get Involved Child
*/
?>

<?php load_get_involved_scripts(); ?>

<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	<? $the_content = get_the_content(); ?>

	<?php endwhile; endif; ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<?php $involved = new WP_Query("pagename=get-involved"); while($involved->have_posts()) : $involved->the_post();?>

				<h1 class="entry-title"><?php the_title(); ?></h1>

			<?php endwhile; ?>

				<div id="get-involved-sidenav">

					<?php $recent = new WP_Query("post_type=page&orderby=date&order=asc&post_parent=14"); while($recent->have_posts()) : $recent->the_post();?>

							<div><a href="<?the_permalink();?>" class="page-<? echo $post->ID; ?>"><?php the_title(); ?></a></div>

					<?php endwhile; ?>

				</div>

				<div id="get-involved-pages">

					<? echo $the_content; ?>

				</div>

				<div class="clearfix"></div>

		</article>

	

<?php get_footer(); ?>