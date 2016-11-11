
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */

(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);


/* Texas Monthly map script
*
*  Designed and developed by Emily Chow (emily.sy.chow@gmail.com)
*  11/10/2016
*
*/

(function(){
	var data = bbqMap.locations;
	var util = {
		isSmall : function(){
			return $(window).width() <= 636;
		},
		itemFullyInViewport: function(array){
			var self = this;
			var heightOffset = self.isSmall() ? $('#map').height() : 0;
			var $item;

			$.each(array, function(i, el){
				var $h2 = $(el).find('h2');

				if ($h2.offset().top + $h2.height() - (window.scrollY + heightOffset) > 0){
					$item = $(el);
					return false;
				}
			});

			return $item;
		}
	}
	var map = {
		unit: null,
		opts: {
			lnglat: [-98.0335911, 30.3074625],
			initZoom: 7
		},
		init: function(opts){
			var self = this;
			var opts = opts || self.opts;

			mapboxgl.accessToken = 'pk.eyJ1IjoiZXNjaG93IiwiYSI6ImNpdmJ0c25yazAxNHIydG1xdXlhODUwMWkifQ.WpFuUhGNHaKz-cilltFwrw';
			var map = new mapboxgl.Map({
				container: 'map', // container id
				style: 'mapbox://styles/mapbox/streets-v9',
				center: opts.lnglat, // starting position
				zoom: opts.initZoom // starting zoom
			});

			// add zoom controls
			map.addControl(new mapboxgl.NavigationControl());
			map.scrollZoom.disable();

			self.unit = map;

			$.each(data, function(k, v){
				self.addMarker(k + 1, v);
			});
		},
		panMap: function(ll){
			var self = this;
			var map = self.unit;

			var offsetX = util.isSmall() ? 0 : $('.list-wrapper').offset().left + $('.list-wrapper').width();

			map.flyTo({
				center: ll,
				offset: [offsetX/2, 0]
			});
		},
		addMarker: function(index, element){
			var self = this;
			var map = self.unit;
			var lnglat = [element.longitude, element.latitude];

			var el = document.createElement('div');
				el.className = 'map-marker';
				el.dataset.index = index;
				el.dataset.lat = element.latitude;
				el.dataset.lng = element.longitude;
				el.dataset.city = element.city;
				el.dataset.year = element.yeardocumented;
				el.innerHTML = "<p>" + index +  "</p>";

			// create the marker
			new mapboxgl.Marker(el, {offset:[-15, -15]})
			    .setLngLat(lnglat)
			    // .setPopup(popup) // sets a popup on this marker
			    .addTo(map);

			$(el).on('click', function(){
				self.highlightMarker($(this), lnglat, true);
			});
		},
		highlightMarker: function($el, ll, scrollTo){
			var self = this;
			this.resetMarkers();
			$el.addClass('marker-active');
			
			self.panMap(ll);

			if (scrollTo){
				list.scrollToItem($el.attr('data-city'), $el.attr('data-year'), $el.attr('data-index'));
			}
		},
		resetMarkers: function(){
			$('.map-marker').removeClass('marker-active');
		}
	}

	var list = {
		init: function(){
			var self = this;

			// listen to scroll,
			// when element is in view, highlight same map marker
			$(window).scroll( $.debounce( 500, function(event){
				var $selectItem = util.itemFullyInViewport($(".list-item:in-viewport"));

				console.info($selectItem);

				var c = $selectItem.attr('data-city'),
					y = $selectItem.attr('data-year'),
					i = $selectItem.attr('data-index'),
					ll = [$selectItem.attr('data-lng'), $selectItem.attr('data-lat')];
				
				var $marker = $('.map-marker[data-city="' + c + '"][data-year="' + y + '"][data-index="' + i + '"]');
				map.highlightMarker($marker, ll);

			} ) );
		},
		scrollToItem: function(c, y, i){
			var $el = $('.list-item[data-city="' + c + '"][data-year="' + y + '"][data-index="' + i + '"]');

			var heightOffset = util.isSmall() ? $('#map').height() : 0;

			$('html, body').animate({
				scrollTop: $el.offset().top + 1 - heightOffset
			}, 400);	
		}
	}

	map.init();
	list.init();

	// highlight first item
	var $first = $('.map-marker[data-index="1"]'),
		ll = [$first.attr('data-lng'), $first.attr('data-lat')];
	map.highlightMarker($first, ll);
})();