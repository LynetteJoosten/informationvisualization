var slide = d3.select('svg').append('line')
	.attr('x1', 0)
	.attr('x2', 0)
	.attr('y1', 0)
	.attr('y2', height)
	.attr('stroke-width', 5)
	.attr('stroke', 'black')
	.on('mouseover', function() {
		d3.select(this).style('cursor', 'e-resize');
	});
	
var overlay = d3.select('#overlay').append('svg')
	.attr('width', '100%')
	.attr('height', '100%')
	.style('position', 'absolute')
	.style('top', 0)
	.style('left', 0)
	.style('pointer-events', 'none');
	
var rect = overlay.append('rect')
	.attr('height', '100%')
	.attr('width', '0%')
	.attr('fill', '#003366')
	.attr('opacity', 0.7);


var twelveH = 12 * 60 * 60 * 1000;
var initDate = new Date('jan 1 1970 08:00:00');

var timeDisplay = d3.select('.page-header')
	.append('span')
	.style('float', 'right')
	.html(initDate.getHours().toString() + ':00 - ' + new Date(initDate.valueOf() + twelveH).getHours().toString() + ':00');
	
var xPos;
var drag = d3.drag()
	.on('drag', function(d,i) {
		xPos = d3.mouse(this)[0];
		if (xPos >= 0 && xPos <= width) {
			d3.select(this).attr('x1', xPos).attr('x2', xPos);
			var perc = xPos/width;
			rect.attr('width', (perc*100).toString() + '%');
			
			var updateDate = new Date(initDate.valueOf() + perc * twelveH)
			timeDisplay.html(updateDate.getHours().toString() + ':00 - ' + new Date(updateDate.valueOf() + twelveH).getHours().toString() + ':00');
		}
	});
	
slide.call(drag);


	

/*	
function repeat() {
	slide.attr('stroke-width', 5)
		.transition()
		.duration(4000)
		.attr('stroke-width', 10)
		.on('end', function() {
			//slide.transition().duration(500)
			//	.attr('stroke-width', 5);
			repeat();
		});
};

repeat();
*/