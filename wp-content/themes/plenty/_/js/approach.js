$(document).ready(function(){
	$('#approach-sidebar .sidebar-link').hover(function(){
		if(!$(this).hasClass('hovered'));
			$(this).addClass('hovered').stop().dequeue().animate({'background-color':'#f8f8f8'},200);
	}, function(){
		$(this).stop().dequeue().animate({'background-color':'none'},200, function(){
			$(this).removeClass('hovered');
		});
	});
})