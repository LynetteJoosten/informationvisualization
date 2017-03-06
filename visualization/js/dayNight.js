var slide = d3.select('svg').append('line')
	.attr('x1', 0)
	.attr('x2', 0)
	.attr('y1', 0)
	.attr('y2', height)
	.attr('stroke-width', 5)
	.attr('stroke', 'black')
	.on('mouseover', function() {
		d3.select(this).style('cursor', 'col-resize');
	});
	
	
var overlay = d3.select('#overlay').append('svg')
	.attr('width', '100%')
	.attr('height', '100%')
	.style('position', 'absolute')
	.style('top', 0)
	.style('left', 0)
	.style('pointer-events', 'none');
	
overlay.append('rect')
	.attr('height', '100%')
	.attr('width', '0%')
	.attr('fill', '#003366')
	.attr('opacity', 0.7);

var xPos;
var drag = d3.drag()
	.on("drag", function(d,i) {
		xPos = d3.mouse(this)[0];
		if (xPos >= 0 && xPos <= width) {
			d3.select(this).attr('x1', xPos).attr('x2', xPos);
			var perc = xPos/width * 100;
			overlay.select('rect').attr('width', perc.toString() + '%')
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