var winHeight = window.innerHeight;

var width = 1000,
    height = winHeight * 0.6,
	centered,
	div,
	clicked = false,
	center = [4.909000, 52.355399],
	now = false,
	compare = false;

var scale = height * 227;
	
var svgContainer = d3.select('#svgContainer').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geo.mercator()
    .scale(scale)
    .center(center)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select('svg')
	.attr('id', 'SVG')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g').attr('id', 'mapLayer')

var compareButton = d3.select('#svgContainer')
	.append('button')
	.attr('id', 'compare')
	.style('position', 'absolute')
	.html('Compare')
	.on('click', compare);

var pz = panzoom(g.node());

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
		.on('mousedown', function(d) {
			now = true;
			setTimeout(function() {
				now = false;
			},200)
		})
		.on('mouseup', function(d) {
			if (!clicked) {
				if (now) {
					zoomIn(d.properties.Buurt_code);
					clicked = true;
				}
			} else if (compare) {
				// DO VISUALIZING TINGS YA KNO BRO SHIIEEEEET
			}
		});
});

function zoomIn(code) {
	d3.selectAll('.neighborhood').transition().duration(800).style('opacity', .1);
	compareButton.style('display', 'none');
	
	var newWidth = height,
		newHeight = height,
		mapSF = .6,
		transDuration = 800;
	
	var nbh = d3.select('#' + code);
	var element = nbh.node();
	var bbox = element.getBBox();
	var sf = 1 / d3.max([bbox.width, bbox.height]) * (150 * (1/mapSF)) //scale factor
	var centroid = [bbox.x*sf + bbox.width*sf/2, bbox.y*sf + bbox.height*sf/2];
	
	svg.transition().duration(transDuration)
		.attr('width', newWidth)
		.attr('height', newHeight);
	
	nbh.transition().duration(transDuration)
		.style('opacity', 1);
		
	d3.select('#mapLayer').transition().duration(transDuration)
			.attr('transform', 'translate(' + (newWidth/2 - centroid[0]) + ',' + (newHeight/2 - centroid[1]) + ') scale(' + sf + ')');
	
	window.setTimeout(xButton, transDuration)
	
	function xButton(){
		pz.dispose();
		d3.select('#svgContainer')
			.append('div').html('&#10006;')
			.attr('id', 'closeBut')
			.style('top', '0px')
			.style('left', newWidth + 20 + 'px')
			.style('font-size', '30px')
			.style('position', 'absolute')
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
				
				setTimeout(reset ,transDuration)
				
				function reset() {
					pz = panzoom(g.node());
					compareButton.style('display', 'initial');
				} 
				
				clicked = false;
			});
	};
};

function compare() {
	compare = true;
	clicked = true;
	compareButton.style('display', 'none');
	
	var newWidth = height,
		newHeight = height,
		transDuration = 800;
	
	svg.transition().duration(transDuration)
		.attr('width', newWidth)
		.attr('height', newHeight);
		
	var projection = d3.geo.mercator()
		.scale(height * 150)
		.center(center)
		.translate([newWidth / 2, newHeight / 2]);

	var path = d3.geo.path()
		.projection(projection);
		
	d3.selectAll('path').transition().duration(transDuration).attr('d', path);
		
	window.setTimeout(xButton, transDuration)
	
	function xButton(){
		d3.select('#svgContainer')
			.append('div').html('&#10006;')
			.attr('id', 'closeBut')
			.style('top', '0px')
			.style('left', newWidth + 20 + 'px')
			.style('font-size', '30px')
			.style('position', 'absolute')
			.on('mouseover', function() {
				d3.select(this).style('cursor', 'pointer');
			})
			.on('click', function(){
				svg
					.attr('width', width)
					.attr('height', height);
					
				var projection = d3.geo.mercator()
					.scale(height * 227)
					.center(center)
					.translate([width / 2, height / 2]);

				var path = d3.geo.path()
					.projection(projection);
					
				d3.selectAll('path').transition().duration(transDuration).attr('d', path);
				
				this.remove();
				
				setTimeout(reset ,transDuration)
				
				function reset() {
					compareButton.style('display', 'initial');
				}
				
				clicked = false;
				compare = false;
			});
	};
};