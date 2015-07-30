// JavaScript Document

$( document ).ready(function() {
	
	/* Resizing bg img FROM http://css-tricks.com/perfect-full-page-background-image/ */
	$(function() {   
	
		var theWindow        = $(window),
			$bg              = $("#bg"),
			aspectRatio      = $bg.width() / $bg.height();
									
		function resizeBg() {
			
			if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
				$bg
					.removeClass()
					.addClass('bgheight');
			} else {
				$bg
					.removeClass()
					.addClass('bgwidth');
			}
						
		}
									
		theWindow.resize(function() {
			resizeBg();
		}).trigger("resize");
	
	});
	
	
	/* Horizontal scroll FROM http://jsfiddle.net/42t8h/1/ - user Teemu on stackoverflow  */
	function scrollPage (e) {
		var delta = e.deltaY || e.wheelDelta,
			dir = (delta > 0) ? -90 : 90;
		if (window.addEventListener && !(window.chrome || window.opera))
			dir *= -1;
			
		window.scrollBy(dir, 0);
		e.returnValue = false;
		if (e.preventDefault)
			e.preventDefault();
		
		return false;
	}
	
	if (window.addEventListener && (!window.chrome && !window.opera))
		window.addEventListener('wheel', scrollPage, false); // IE9+, FF
	
	
	else if (window.chrome || window.opera)
		window.addEventListener('mousewheel', scrollPage, false); // Chrome & Opera
	
	
	else
		document.attachEvent('onmousewheel', scrollPage); // IE8-

	
	/*getting height for content-smartphones resize*/
	function resize() {
		var height = window.innerHeight;
		document.getElementById("content").style.height = height-90 + "px";
	}
	
	resize();
	window.onresize = function() {
		resize();
	};
	
	
	/*filterColour state toggle*/
	var navMenu = document.getElementById( 'navMenu' ),
		filterColour = document.getElementById( 'filterColour' ),
		navMenuOpen = false;
	
	filterColour.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( navMenu, 'open' );
		
		if ( navMenuOpen )
			navMenuOpen = false;
			
		else
			navMenuOpen = true;
		
		/*alert('navMenu is open: ' + navMenuOpen);*/
	};
	
	
	/*colourButton state toggle & toggle to filterClear*/
	var activeCount = 0,
		clearFilterActive = false;
		
	$( '.colourButton' ).click(function() {
		if ( !($( this ).hasClass( 'colourButtonActive' )) ) {
			filterAlert('Phones filtering down with selected filter applied: ' + $( this ).text(), 1000);
			activeCount++;
		}
		
		else {
			activeCount--;			
			filterAlert('Following colour deselected: ' + $( this ).text(), 1000);
		}
			
		
		$( this ).toggleClass( 'colourButtonActive' );
		
		if( activeCount > 0 && !(clearFilterActive) ) {
			$( '#filterClear').text('Clear all filters');
			$( '<div id="icon">&#8634;</div>').appendTo( $( '#filterClear') );
			$( '#filterClear').removeClass('navButton').addClass('clearButton');
			clearFilterActive = true;
		}
			
		else if( activeCount < 1){
			$( '#filterClear').text('Filter products by');
			$( '#filterClear').removeClass('clearButton').addClass('navButton');
			clearFilterActive = false;
		}
	});
	
	
	/*Clear all filters affecting all colour filter buttons*/
	$( '#filterClear' ).click( function() {
		
		if( clearFilterActive && activeCount > 0) {
			$( '.colourButton' ).each( function() {
					$(this).removeClass( 'colourButtonActive' );
					$( '#filterClear').text('Filter products by');
					$( '#filterClear').removeClass('clearButton').addClass('navButton');
			});
			
		clearFilterActive = false;
		activeCount = 0;
		filterAlert('Phones set back to default', 1000);
		}
	});
	
	
	/*Close navBar when tapping outside*/
	$(document).click( function(e) {
		if ( $(e.target).parents().index( $('#navMenu') ) == -1 && navMenuOpen ) {
			classie.toggle( filterColour, 'active' );
			classie.toggle( navMenu, 'open' );
			navMenuOpen = false;
		}
	});
	
	
	/*Temporary alert FROM http://jsfiddle.net/Tq5m3/ - user Travis J on stackoverflow*/
	function filterAlert(msg,duration)
	{
	 var alertDiv = document.createElement("div");
	 var width = window.innerWidth;

	 alertDiv.setAttribute("style","position:fixed; top: 30px; right: 50px; background-color:rgba(0, 165, 139, 0.5); color:(73, 74, 74)");
	 alertDiv.innerHTML = msg;
	 
	 setTimeout(function(){
	 	alertDiv.parentNode.removeChild(alertDiv);
	 	}, duration);
	 
	 document.body.appendChild(alertDiv);
	}
	
});