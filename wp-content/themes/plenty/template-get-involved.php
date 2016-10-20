<?php
/*
Template Name: Get Involved
*/
?>

<?php load_get_involved_scripts(); ?>

<?php get_header(); ?>

	<?php $involved = new WP_Query("pagename=get-involved"); while($involved->have_posts()) : $involved->the_post();?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<h1 class="entry-title"><?php the_title(); ?></h1>

				<div id="get-involved-sidenav">

					<?php $recent = new WP_Query("post_type=page&orderby=date&order=asc&post_parent=14"); while($recent->have_posts()) : $recent->the_post();?>

							<div><a  href="<?the_permalink();?>" class="page-<? echo $post->ID; ?>"><?php the_title(); ?></a></div>

							<?php
								
								$post_data = get_post($post->ID, ARRAY_A);
								
								$slug = $post_data['post_name'];

								if($slug === 'careers') $content = get_the_content();

							?>

					<?php endwhile; ?>

				</div>

				<div id="get-involved-pages">

					<? echo $content; ?>

				</div>

				<div class="clearfix"></div>

		</article>

	<?php endwhile; ?>

<?php get_footer(); ?>