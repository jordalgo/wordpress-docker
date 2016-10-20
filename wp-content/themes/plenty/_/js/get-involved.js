$(document).ready(function(){
	$('#get-involved-sidenav a').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#ffffff','background-color':'#7bb9f1'}, 200);
		}
	}, function(){
		$(this).stop().dequeue().animate({'color':'#7d7c7c', 'background-color':'#ffffff'}, 200, function(){
			$(this).removeClass('hovered');
		})
	});

	$('#get-involved-pages ul a').prepend('<span class="a"></span><span class="b"></span>').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#a4234d'}, 200);
			if(!isBadIE){
				$(this).find('.b').stop().dequeue().animate({'opacity':'1','left':'6px'},200, function(){
					$(this).css('display','block')
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

	addHoverColor('#get-involved-pages :not(ul) a', '#a4234d');

});