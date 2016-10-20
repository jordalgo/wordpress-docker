$(document).ready(function(){

	var theWindow = $(window),
		fixedFix = $('#fixed-fix'),
		windowHeight = 0,
		windowWidth = 0,
		windowScrollTop = 0,
		windowScrollLeft = 0,
		image = 'http://eci.plentycontent.com/wp-content/themes/plenty-theme/images/map-marker.png',
		mapOptions = {
			center: new google.maps.LatLng(40.69347, -73.99071),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		bounds = new google.maps.LatLngBounds(),
		marker = new Array(),
		infobox = new Array();

	$('.school-more').click(function(e, wasTriggered){

		if(!wasTriggered) {
			var index = $('.school-more').index($(this));
			google.maps.event.trigger(marker[index], 'click', true);
		}		

		$(this).fadeOut(200);
		$(this).parent().find('.school-hidden').slideDown(200)
		$(this).parent().find('.school-close').css('opacity','1').delay(200).fadeIn(200);

		if(isBadIE){
			$(this).removeClass('hovered').find('.b').css('display','none');
			$(this).find('.a').css('display','block');
		}
		else {
			$(this).find('.b').stop().dequeue().fadeOut(200, function(){
				$(this).css('opacity','1');
				$(this).parent().removeClass('hovered');
			});
		}
	});

	$('.school-more').hover(function(){
		if(!$(this).hasClass('hovered')){
			if(isBadIE){
				$(this).addClass('hovered').find('.b').css('display','block');
				$(this).find('.a').css('display','none');
			}
			else {
				$(this).addClass('hovered').find('.b').stop().dequeue().fadeIn(200, function(){
					$(this).css('display','block');
				});
			}
		}
	}, function(){
		if(isBadIE){
			$(this).removeClass('hovered').find('.b').css('display','none');
			$(this).find('.a').css('display','block');
		}
		else {
			$(this).find('.b').stop().dequeue().fadeOut(200, function(){
				$(this).css('opacity','1');
				$(this).parent().removeClass('hovered');
			});
		}
	});

	$('.school-close').click(function(e, wasTriggered){
		$(this).fadeOut(200);
		if(!wasTriggered){
			var index = $('.school-close').index($(this));
			infobox[index].close();
		}

		$(this).parent().find('.school-hidden').slideUp(200);
		$(this).parent().find('.school-more').delay(200).fadeIn(200);
	});

	
	$('.school-item').each(function(idx){
		var that = this;
		var myLatlng = new google.maps.LatLng($(this).find('.school-lat').text(),$(this).find('.school-lng').text());

		marker[idx] = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
		var infoContent = getElementsByClassName(this, 'infobox')[0];
		infobox[idx] = new InfoBox({
			content: infoContent,
			disableAutoPan: false,
			maxWidth: 308,
			pixelOffset: new google.maps.Size(-29, -130),
			zIndex: null,
			boxStyle: {
				width: "325px"
			},
			infoBoxClearance: new google.maps.Size(35, 10),
			closeBoxURL: ''
		 });

		$(infobox[idx]['content_']).find('.info-close').click(function(){
			$('.school-close:eq(' + idx + ')').trigger('click', true);
			infobox[idx].close();
		})
		
		google.maps.event.addListener(marker[idx], 'click', function(wasTriggered) {
			if(wasTriggered !== true){
				$('html,body').animate({scrollTop: $('.school-item:eq('+ idx +')').offset().top - 5},600);
				setTimeout(function(){$('html,body').stop().dequeue().animate({scrollTop: $('.school-item:eq('+ idx +')').offset().top - 5},600);}, 200); //In case the offset of the school item changes when one above it closes
			}
			$('.school-more:eq(' +idx + ')').trigger('click', true)
			for(var i = 0; i < infobox.length; i++){
				if(infobox[i].getVisible()){
					infobox[i].close();
					$('.school-close:eq(' + i + ')').trigger('click', true);
				}
			}
			
			infobox[idx].open(map, this);
			map.panTo(marker[idx].position);
		});

		bounds.extend(myLatlng);
	});

	map.fitBounds(bounds);	

	theWindow.ready(function(){

		windowWidth = theWindow.width();
		windowHeight = theWindow.height();

		theWindow.scroll(function(){

			windowScrollTop = theWindow.scrollTop();
			windowScrollLeft = theWindow.scrollLeft();

			if(windowScrollTop > 210) {
				fixedFix.addClass('active');
			}
			else {
				fixedFix.removeClass('active');
			}
			
			if(windowWidth < 1200) {
				fixedFix.css('margin-left',-600 + (1200 - windowWidth)/2 - windowScrollLeft);
			}

			if(($('#map-wrap').height() + 50 + $('#push').height()) > windowHeight &&  windowScrollTop + fixedFix.height() + 20 > $('#footer').position().top) {
				fixedFix.css('margin-top', $('#footer').position().top - (windowScrollTop + fixedFix.height() + 20) );
			}
			else {
				fixedFix.css('margin-top','0')
			}

		});

		theWindow.resize(function(){

			windowWidth = theWindow.width();
			windowHeight = theWindow.height();

			if(windowWidth < 1200) {
				fixedFix.css('margin-left',-600 + (1200 - windowWidth)/2 - windowScrollLeft );
			}
			else {
				fixedFix.css('margin-left',-600);
			}
		});
	})

	$('.school-video').click(function(e){

		e.preventDefault();

		var video_id = $(this).attr('href').match(/[\?|\&]v\=[a-zA-Z0-9-_]+/)[0].replace(/[\?|\&]v\=/, '');
		if(isBadIE) {
			$('#lightbox-overlay').fadeTo(300, '.8');
		}
		else {
			$('#lightbox-overlay').fadeIn(300);
		}
		
		$('#lightbox').fadeIn(500, function(){
			$('#lightbox-content').html('<iframe width="741" height="416" src="http://www.youtube-nocookie.com/embed/'+ video_id +'?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
		});

	});

});