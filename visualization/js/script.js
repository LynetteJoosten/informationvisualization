var width = 1000,
    height = 650,
	centered,
	div,
	clicked = false,
	center = [4.909000, 52.355399];

var svg = d3.select('#svgContainer').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geoMercator()
    .scale(140000)
    .center(center)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g').attr('id', 'mapLayer')

d3.json('geojson/adamBuurtenExWater.geojson', function(error, mapData) {
    var features = mapData.features;
	//console.log(features)
	
    g.selectAll('path')
        .data(features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
		.attr('id', function(d) {return d.properties.Buurt_code})
		.attr('class', 'neighborhood')
	    .style('stroke', '#000')
		.style('fill', '#999')
		.on('mouseover', function(d) {
			div = d3.select('body').append('div')	
				.attr('id', 'tooltip');
            div.html(d.properties.Buurt)
                .style('left', (d3.event.pageX) + 'px')		
                .style('top', (d3.event.pageY - 28) + 'px')
			div
				.style('width', (document.getElementById('tooltip').clientWidth + 16) + 'px')
				.style('height', (document.getElementById('tooltip').clientHeight) + 'px');
				
			d3.select(this).style('cursor', 'pointer');
            })					
        .on('mouseout', function() {		
            div.remove();
        })
		.on('mousemove', function() {
			div
				.style('left', (d3.event.pageX) + 'px')		
				.style('top', (d3.event.pageY - 28) + 'px');
		})
		.on('click', function(d) {
			if (!clicked) {
				zoomIn(d.properties.Buurt_code);
			}
			clicked = true;
		});
});

function zoomIn(code) {
	d3.selectAll('.neighborhood').transition().duration(800).style('opacity', .1);
	
	var newWidth = 500,
		newHeight = 500,
		mapSF = .6,
		transDuration = 800;
	
	var nbh = d3.select('#' + code);
	var element = nbh.node();
	var bbox = element.getBBox();
	var sf = 1 / d3.max([bbox.width, bbox.height]) * (150 * (1/mapSF)) //scale factor
	var centroid = [bbox.x*sf + bbox.width*sf/2, bbox.y*sf + bbox.height*sf/2];
	
	//nbh.node().parentNode.appendChild(nbh.node());
	
	svg.transition().duration(transDuration)
		.attr('width', newWidth)
		.attr('height', newHeight);
	
	nbh.transition().duration(transDuration)
		.style('opacity', 1)
		
	d3.select('#mapLayer').transition().duration(transDuration)//.attr('transform', 'scale(' + scale.toString() + ')')
			.attr('transform', 'translate(' + (newWidth/2 - centroid[0]).toString() + ',' + (newHeight/2 - centroid[1]).toString() + ') scale(' + sf + ')');
	
	window.setTimeout(xButton ,transDuration);
	
	function xButton(){
		d3.select('#svgContainer')
			.append('div').html('&#10006;')
			.style('float', 'right')
			.style('font-size', '30px')
			.on('mouseover', function() {
				d3.select(this).style('cursor', 'pointer');
			})
			.on('click', function(){
				svg.transition().duration(transDuration)
					.attr('width', width)
					.attr('height', height);
				d3.selectAll('.neighborhood').transition().duration(transDuration)
					.style('opacity', 1);
				d3.select('#mapLayer').transition().duration(transDuration)
					.attr('transform', 'matrix(1, 0, 0, 1, 0, 0)');
				this.remove();
				clicked = false;
			});
	};
};