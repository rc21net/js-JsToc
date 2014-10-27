(function( $ ) {
	$.fn.jsTOC = function (params) {
		/**
		 * Params object initialization.
		 * Available params properties:
		 *     contentSelector - DOM element selector for headlines search, default value - 'body'
		 *     title - text title of the TOC
		 */
		params = params || {};
		
		// content selector
		var contentSelector = params.contentSelector || 'body';
		
		// create root element of TOC
		var toc = $('<ul></ul>');
		
		// get all headlines
		var headers = $(contentSelector).find('h2, h3, h4, h5, h6');
		
		var currentLevel = 0;
		var currentLevelUL = toc;
		var lastLI = [];
		
		// headlines loop
		headers.each(function(index){
			
			// add anchor id
			$(this).attr('id', 'jstoc'+index);
			
			// create list item with link
			var li = $('<li></li>');
			$('<a></a>')
				.text($(this).text())
				.attr('href', '#jstoc'+index)
				.appendTo(li);
				
			
			var level = $(this).prop("tagName").substring(1);
			
			// current level
			if (currentLevel == 0 || level == currentLevel) {
				li.appendTo(currentLevelUL);
			}
			// sublevel
			else if (level > currentLevel) {
				var subUL = $('<ul></ul>');
				li.appendTo(subUL);
				
				/*var collapser = $('<i class="collapser">+</i>');
				collapser.prependTo(lastLI[currentLevel]);*/
				subUL.appendTo(lastLI[currentLevel])
				
				currentLevelUL = subUL;
			}
			// exit from sublevel
			else if (level < currentLevel) {
				
				currentLevelUL = lastLI[level].parent();
				li.appendTo(currentLevelUL);
			}
			
			currentLevel = level;
			lastLI[level] = li;
			
		});
		
		// append TOC to target element
		toc.appendTo(this);
		
		// append TOC title
		if (params.title) {
			$('<h2></h2>')
				.text(params.title)
				.css('cursor', 'pointer')
				.prependTo(this)
				.click(function(){
					toc.slideToggle();
				});
		}
		
		// add style class for root element
		this.addClass('jsTOC')
		
		//toc.hide();
		
	}
	
})(jQuery);
