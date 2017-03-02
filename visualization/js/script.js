var width = 1000,
    height = 650,
	centered,
	div;

var svg = d3.select('#svgContainer').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geoMercator()
    .scale(140000)
    .center([4.909000, 52.355399])
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g').attr('id', 'mapLayer')

d3.json('geojson/adamBuurtenExWater.geojson', function(error, mapData) {
    var features = mapData.features;
	console.log(features)
	
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
			zoomIn(d.properties.Buurt_code);
		});
});

function zoomIn(code) {
	d3.selectAll('.neighborhood').style('opacity', .1);
	var nbh = d3.select('#' + code);
	nbh.style('opacity', 1);
	var centroid = getBoundingBoxCenter(nbh);
	
	nbh.transition().duration(1200).attr('transform', 'translate(' + (500 - centroid[0]).toString() + ',' + (325 - centroid[1]).toString() + ')');
	
	var nbh = d3.select('#' + code);
	nbh.parentNode.appendChild(nbh);
};	

function getBoundingBoxCenter (selection) {
  var element = selection.node();
  var bbox = element.getBBox();
  return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
};