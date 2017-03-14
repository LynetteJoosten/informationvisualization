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
    if (delta < 0) {
        console.log('down');
		if (pos * f < window.innerHeight) {
			pos += 1;
		}
		ov2svg.style('top', -(window.innerHeight - pos * f) + 'px');
    } else {
        console.log('up');
		if (pos > 0) {
			pos -= 1;
		}
		ov2svg.style('top', -(window.innerHeight - pos * f) + 'px');
	}
	console.log(pos);
}