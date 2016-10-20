$(document).ready(function(){

	$('#contact-section .email, #contact-section .facebook, #contact-section .twitter, #contact-section .youtube').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'background-color':'#f5f5f5'}, 200);
		}
	}, function(){
		$(this).stop().dequeue().animate({'background-color':'#fff'}, 200, function(){
			$(this).removeClass('hovered');
		});
	});

	$('#contact-section a').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#a4234d'}, 200);
			if(!isBadIE){
				$(this).find('.b').stop().dequeue().animate({'opacity':'1'},200, function(){
					$(this).css('display','block')
				});
			}
			else {
				$(this).find('.b').show();
				$(this).find('.a').hide();
			}
		}
	}, function(){
		$(this).stop().dequeue().animate({'color':'#2885d8'}, 200, function(){
			$(this).removeClass('hovered');
		})
		if(!isBadIE){
			$(this).find('.b').stop().dequeue().animate({'opacity':'0'},200, function(){
				$(this).css('display','block');
			});
		}
		else {
			$(this).find('.a').show();
			$(this).find('.b').hide();
		}
	});

	var image = new google.maps.MarkerImage(
		'http://eci.plentycontent.com/wp-content/themes/plenty-theme/images/eci-marker.png',
		new google.maps.Size(53, 68),
		new google.maps.Point(0,0),
		new google.maps.Point(27, 68)
	);

	var shadow = new google.maps.MarkerImage(
		'http://eci.plentycontent.com/wp-content/themes/plenty-theme/images/eci-marker-shadow.png',
		new google.maps.Size(66, 13),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 12)
	);

	var mapOptions = {
		center: new google.maps.LatLng(40.69347, -73.99071),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		styles : [{
			"featureType": "road.highway",
			"stylers": [
				{ "hue": "#0077ff" },
				{ "saturation": -49 },
				{ "lightness": 16 }
			]
		},{
			"featureType": "water",
			"stylers": [
				{ "saturation": -42 },
				{ "lightness": 19 }
			]
		},{
			"featureType": "road.arterial",
			"stylers": [
				{ "hue": "#006eff" },
				{ "saturation": -47 },
				{ "lightness": 19 }
			]
		},{
			"featureType": "poi.park",
			"stylers": [
				{ "lightness": 16 },
				{ "saturation": -33 },
				{ "hue": "#007fff" }
			]
		},{
			"featureType": "poi.school",
			"stylers": [
				{ "hue": "#007fff" },
				{ "saturation": -19 }
			]
		},{
			"featureType": "poi.business",
			"stylers": [
				{ "hue": "#007fff" }
			]
		},{
			"featureType": "landscape.man_made",
			"stylers": [
				{ "hue": "#0055ff" },
				{ "saturation": -40 }
			]
		},{
			"featureType": "poi.government",
			"stylers": [
				{ "hue": "#005eff" },
				{ "saturation": -44 }
			]
		},{
			"featureType": "transit.line",
			"stylers": [
				{ "saturation": -11 },
				{ "lightness": 14 }
			]
		}]
	};

	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(40.69347, -73.99071),
		map: map,
		shadow: shadow,
		icon: image
	});
	
});