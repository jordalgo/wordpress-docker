$(document).ready(function(){
	$('article table a').html('<span class="a"></span><span class="b"></span>').addClass('sro');

	$('.sideInfo').hover(function(){
		if(!$(this).hasClass('hovered'));
			$(this).addClass('hovered').stop().dequeue().animate({'background-color':'#f8f8f8'},200);
	}, function(){
		$(this).stop().dequeue().animate({'background-color':'#fff'},200, function(){
			$(this).removeClass('hovered');
		});
	});


	$('#jfcg .video_embed').click(function(e){
		e.preventDefault();

		var video_id = $(this).attr('href').match(/[\?|\&]v\=[a-zA-Z0-9-_]+/)[0].replace(/[\?|\&]v\=/, '');
		if(isBadIE) {
			$('#lightbox-overlay').fadeTo(300, '.8');
		}
		else {
			$('#lightbox-overlay').fadeIn(300);
		}
		$('#lightbox').fadeIn(500, function(){
			clearInterval(slideInterval);
			$('#lightbox-content').html('<iframe width="741" height="416" src="http://www.youtube-nocookie.com/embed/'+ video_id +'?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
		})
	});
})