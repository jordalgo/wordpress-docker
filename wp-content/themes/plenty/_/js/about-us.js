if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}

$(document).ready(function(){
	
	var after;
	var save = new Array();
	$('.staff-item p').each(function(idx){
		after = false;
		save[idx] = new Array();
		$(this).contents().filter(function() {
			if(this.nodeType === 1 && this.id.match('more-')){
				after = true;
			}
			else if(after) {
				save[idx].push(this);
				var parent = this.parentNode;
				var hidden_section = document.createElement('span');
				hidden_section.setAttribute('class','staff-hidden-section');
				
				if(!getElementsByClassName(parent, 'sro').length) {
					var read_more = document.createElement('a');
					read_more.innerHTML = 'READ MORE<span class="a"></span><span class="b"></span>';
					read_more.setAttribute('class', 'readmore');
					parent.appendChild(read_more);
					parent.replaceChild(hidden_section,this);
					
				}
					$(this).text($(this).text().replace(/^\s/, ''));

					hidden_section.appendChild(this);

			}
		});
	});

	$('#staff-section .readmore').click(function(){
		if($(this).hasClass('readless')){
			$(this).parent().find('.staff-hidden-section').hide(200);
			$(this).removeClass('readless').html('READ MORE<span class="a"></span><span class="b"></span>');
			$(this).removeClass('hovered').stop().dequeue().animate({'color':'#2885d8'}, 200)
		}
		else {
			$(this).parent().find('.staff-hidden-section').show(200);
			$(this).addClass('readless').html('READ LESS<span class="a"></span><span class="b"></span>');
			$(this).removeClass('hovered').stop().dequeue().animate({'color':'#2885d8'}, 200)
		}
	});

	$('.readmore').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#a4234d'}, 200)
			if(!isBadIE){
				$(this).find('.b').stop().dequeue().animate({'opacity':'1'},200, function(){
					$(this).css('display','block');
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

	$('#about-us-sidenav a').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'color':'#ffffff','background-color':'#7bb9f1'}, 200)
		}
	}, function(){
		$(this).stop().dequeue().animate({'color':'#7d7c7c', 'background-color':'#ffffff'}, 200, function(){
			$(this).removeClass('hovered');
		})
	});

	$('.news-info').hover(function(){
		if(!$(this).hasClass('hovered')){
			$(this).addClass('hovered').stop().dequeue().animate({'background-color':'#f5f5f5'}, 200);
		}
	}, function(){
		$(this).stop().dequeue().animate({'background-color':'#fff'}, 200, function(){
			$(this).removeClass('hovered');
		});
	});

});