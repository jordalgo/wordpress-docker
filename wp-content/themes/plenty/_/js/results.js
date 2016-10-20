$(document).ready(function(){

	var galleryIndex;
	var galleryArray;

	$('#results-section h2 a').hover(function(){
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
			item.find('.results-entry').slideUp(500, function(){
				item.removeClass('active');
			})
		}
		else {
			if($('.results-item.active').length){
				$('.results-item.active .results-entry').slideUp(500, function(){
					$(this).parent().removeClass('active');
				})
			}
			item.addClass('active').find('.results-entry').slideDown(500);	
		}
		
	});

	$('.results-entry').each(function(){
		if($(this).find('a img').length){
			$(this).append('<div class="results-gallery"><div class="prev-arrow sro controls"><span class="a"></span><span class="b"></span></div><div class="next-arrow sro controls"><span class="a"></span><span class="b"></span></div><div class="results-gallery-viewport"><div class="results-gallery-container"></div></div></div>');
		}
	});
	

	$('.results-entry a').each(function(){
		if($(this).find('img').length){
			$(this).closest('.results-entry').find('.results-gallery-container').append(this)
		}
	});

	$('.results-gallery-container a').append('<div class="results-hover"></div>')

	$('.results-gallery-container').each(function(){
		if($(this).children().length > 2) {
			$(this).closest('.results-gallery').find('.next-arrow').show();
		}
	});

	$('.results-gallery-container a').live({mouseenter:function(){
		if(!$(this).hasClass('hovered')){
			$(this).find('.results-hover').addClass('hovered').stop().dequeue().fadeIn(200, function(){
				$(this).css('display','block')
			});
		}
	}, mouseleave:function(){
		$(this).find('.results-hover').stop().dequeue().fadeOut(200, function(){
			$(this).parent().removeClass('hovered');
			$(this).css('opacity','1')
		});
	}, click:function(e){
		e.preventDefault();
		$(this).parent().children().each(function(idx){
			if(idx === 0) galleryArray = new Array();
			galleryArray.push($(this).attr('href'));
		});

		galleryIndex = $('.results-gallery-container a').index($(this));

		var imgsrc = $(this).attr('href'); // Get my img elem
		var pic_real_width, pic_real_height;
		var img = $("<img/>") // Make in memory copy of image to avoid css issues
			
			.bind('load',function() {
				pic_real_width = this.width;   // Note: $(this).width() will not
				pic_real_height = this.height; // work for in memory images.
				$('#lightbox').css({'width':pic_real_width + 10,'height': pic_real_height+10,'margin-left': (pic_real_width + 10)/-2,'margin-top':(pic_real_height + 10)/-2}).fadeIn(200);
				if(isBadIE) {
					$('#lightbox-overlay').fadeTo(200, '.8');
				}
				else {
					$('#lightbox-overlay').fadeIn(200);
				}
				$('#lightbox-content').append($(this));
				if(!$('#lightbox-arrow-left').length) {
					$('#lightbox-content').append('<div id="lightbox-arrow-left">Prev</div><div id="lightbox-arrow-right">Next</div>');
				}
				if(galleryIndex === 0) $('#lightbox-arrow-left').hide();
				else if(galleryIndex === galleryArray.length - 1) $('#lightbox-arrow-right').hide();
					
			}).attr("src", imgsrc);

		if(img.complete) $(img).trigger("load");

	}});

	$('#lightbox-arrow-left').live('click', function(){
		var newIndex = galleryIndex - 1;
		if(newIndex >= 0) {
			$('#lightbox-arrow-right').show();
			$('#lightbox-content img').attr('src', galleryArray[newIndex]);
		}
		if (newIndex < 1) {
			$(this).hide();
		}

		galleryIndex = newIndex;
	});

	$('#lightbox-arrow-right').live('click', function(){
		var newIndex = galleryIndex + 1;

		if(newIndex < galleryArray.length){
			$('#lightbox-arrow-left').show();
			$('#lightbox-content img').attr('src', galleryArray[newIndex]);
		}
		if(newIndex === (galleryArray.length - 1)){
			$(this).hide();
		}

		galleryIndex = newIndex;
	});

	$('.next-arrow').click(function(){
		var container = $(this).closest('.results-gallery').find('.results-gallery-container');
		var gallery = $(this).closest('.results-gallery');
		var that = this;
		if(!gallery.hasClass('animated')) {
			gallery.addClass('animated').find('.results-gallery-container').stop().dequeue().animate({'margin-left':'-=287px'}, 300, function(){
				gallery.removeClass('animated');
				if( parseInt(container.css('margin-left')) <= (container.find('a').length - 3) * -287){
					$(that).hide();
				}
				$(that).siblings('.prev-arrow').show();
			});
		}	
	});
	$('.prev-arrow').click(function(){
		var container = $(this).closest('.results-gallery').find('.results-gallery-container');
		var gallery = $(this).closest('.results-gallery');
		var that = this;
		if(!gallery.hasClass('animated')) {
			gallery.addClass('animated').find('.results-gallery-container').stop().dequeue().animate({'margin-left':'+=287px'}, 300, function(){
				gallery.removeClass('animated');
				if( parseInt(container.css('margin-left')) == 0){
					$(that).hide();
				}
				$(that).siblings('.next-arrow').show();
			});
		}	
	});
})