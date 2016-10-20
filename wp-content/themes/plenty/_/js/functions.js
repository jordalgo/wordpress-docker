// remap jQuery to $
(function($){})(window.jQuery);

var isBadIE = false;
$(document).ready(function(){

	if (jQuery.browser.msie  && parseInt(jQuery.browser.version, 10) <= 8) isBadIE = true;

	addHoverColor('#footer ul li a', '#72b8f7');

	$('.sro').live({mouseenter:function(){
		if(isBadIE){
			$(this).find('.b').css('filter','none');
			$(this).find('.a').css('filter','alpha(opacity=0)');
		}
		else if(!$(this).hasClass('sro-hover')) {
			$(this).addClass('sro-hover').find('.b').stop().dequeue().animate({'opacity':'1'},200, 'linear');
		}
	}, mouseleave:function(){
		if(isBadIE){
			$(this).find('.b').css('filter','alpha(opacity=0)');
			$(this).find('.a').css('filter','none');
		}
		else {
			$(this).find('.b').stop().dequeue().animate({'opacity':'0'},200, function(){
				$(this).parent().stop().removeClass('sro-hover');
			});
		}
	}});
	
	$('#lightbox-close').click(function(){
		if(typeof slideInterval !== 'undefined') slideInterval = setInterval(slide, 8000);
		$('#lightbox-content').html('');
		$('#lightbox-overlay').fadeOut(300);
		$('#lightbox').fadeOut(500);
	});
})

function addHoverColor(selector, color, speed){
	if(!speed) {
		speed = 250;
	}
	
	$(selector).each(function(){
		var oldColor = $(this).css('color');
		$(this).hover(function(){
			if( !$(this).hasClass('hovered') ) $(this).addClass('hovered').stop().dequeue().animate({'color':color},speed, 'linear');
		}, function(){
			$(this).removeClass('hovered');
			$(this).stop().dequeue().animate({'color':oldColor},speed, 'linear', function(){
				
			});
		});
	});
}

function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}