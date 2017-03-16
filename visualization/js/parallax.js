var overlay2 =d3.select('#overlay2').append('svg')
	.attr('id', 'parallaxViz')
	.attr('width', '100%')
	.attr('height', '100%')
	//.attr('transform', 'translate(0, -' + window.innerHeight + ')')
	.style('position', 'fixed')
	.style('top', -window.innerHeight + 'px')
	.style('left', 0)
	
var backgroundRect = overlay2.append('rect')
	.attr('width', '100%')
	.attr('height', '100%')
	.attr('fill', 'white')
	.attr('opacity', 0.95);

window.addEventListener('DOMMouseScroll', mouseWheelEvent);

var pos = 0; 

var ov2svg = d3.select('#parallaxViz');
function mouseWheelEvent(e) {
	var f = 30;
	var delta = e.detail < 0 || e.wheelDelta > 0 ? 1 : -1;
	var timeout = setTimeout(function() {
		pos = 0;
	}, 1200);
    if (delta < 0) {
		if (pos <= 6) {
			pos += 1;
		} else if (pos > 6) {
			ov2svg.transition().duration(1000).style('top', '0px');
			clearTimeout(timeout);
			pos = 0;
		}
    } else {
		if (pos <= 6) {
			pos += 1;
		} else if (pos > 6) {
			ov2svg.transition().duration(1000).style('top', -window.innerHeight + 'px');
			clearTimeout(timeout);
			pos = 0;
		}
	}
}