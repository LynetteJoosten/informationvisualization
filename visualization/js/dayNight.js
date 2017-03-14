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
	.style('position', 'fixed')
	.style('top', 0)
	.style('left', 0);
	
var rect = overlay.append('rect')
	.attr('height', '100%')
	.attr('width', '100%')
	.attr('fill', '#003366')
	.attr('opacity', 0);

d3.select('.page-header').style('border-bottom', 'none')
var colorScale = d3.scaleQuantize().domain([0,1])
      //.interpolate(d3.interpolateRgb)
      .range([d3.rgb("#333"), d3.rgb('#FFF')]);
	
var h24 = 24 * 60 * 60 * 1000;
var initDate = new Date('jan 1 1970 06:00:00');

var timeDisplay = d3.select('.page-header')
	.append('span')
	.style('float', 'right')
	.html(initDate.getHours().toString() + ':00'); //- ' + new Date(initDate.valueOf() + h24/12).getHours().toString() + ':00');
	
var xPos;
var drag = d3.drag()
	.on('drag', function() {
		xPos = d3.mouse(this)[0];
		if (xPos >= 0 && xPos <= width) {
			d3.select(this).attr('x1', xPos).attr('x2', xPos);
			var perc = xPos/width;
			rect.attr('opacity', perc);
			
			d3.select('.page-header')
				.style('color', colorScale(perc));
			
			var updateDate = new Date(initDate.valueOf() + perc * h24)
			timeDisplay.html(updateDate.getHours().toString() + ':00'); //- ' + new Date(updateDate.valueOf() + h24/12).getHours().toString() + ':00');
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