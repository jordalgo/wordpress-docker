$(document).ready(function(){

	$('.partner-entry ul li a').prepend('<span class="a"></span><span class="b"></span>').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#a4234d'}, 200);
			if(!isBadIE){
				$(this).find('.b').stop().dequeue().animate({'opacity':'1','left':'6px'},200, function(){
					$(this).css('display','block');
				});
				$(this).find('.a').stop().dequeue().animate({'left':'6px'}, 200);
			}
			else {
				$(this).find('.b').css({'filter':'none','left':'6px'});
				$(this).find('.a').css({'left':'6px'});
			}
		}
	}, function(){
		$(this).stop().dequeue().animate({'color':'#2e85d3'}, 200, function(){
			$(this).removeClass('hovered');
		})
		if(!isBadIE){
			$(this).find('.b').stop().dequeue().animate({'opacity':'0','left':'0px'},200, function(){
				$(this).css('display','block');
			});
			$(this).find('.a').stop().dequeue().animate({'left':'0px'}, 200);
		}
		else {
			$(this).find('.b').css({'filter':'alpha(opacity=0)','left':'0px'});
			$(this).find('.a').css({'left':'0px'});
		}
	});

	$('#partners-section h2 a').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#a4234d','background-color':'#f9f9f9'}, 200);
			if(!isBadIE){
				$(this).find('.b').stop().dequeue().fadeIn(200, function(){
					$(this).css('display','block');
				});
			}
			else {
				$(this).find('.b').show();
			}
		}
	}, function(){
		$(this).stop().dequeue().animate({'color':'#2e85d3', 'background-color':'#ffffff'}, 200, function(){
			$(this).removeClass('hovered');
		})
		if(!isBadIE){
			$(this).find('.b').stop().dequeue().fadeOut(200, function(){
				$(this).css('opacity','1');
			});
		}
		else {
			$(this).find('.b').hide();
		}
	}).click(function(){
		var item = $(this).parent().parent();
		if(item.hasClass('active')){
			item.find('.partner-entry').slideUp(500, function(){
				item.removeClass('active');
			})
		}
		else {
			if($('.partner-item.active').length){
				$('.partner-item.active .partner-entry').slideUp(500, function(){
					$(this).parent().removeClass('active');
				})
			}
			item.addClass('active').find('.partner-entry').slideDown(500);	
		}
	});
	
})