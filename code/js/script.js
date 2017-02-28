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

    
var currentYear = 2015
var currentMonth = 3

d3.json('geojson/adamBuurtenExWater.geojson', function(error, mapData) {
    var features = mapData.features;
	console.log(features)
  
    g.selectAll('path')
        .data(features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
		.attr('id', function(d) {return d.properties.Buurt})
		.attr('class', function(d) {return 'n'+d.properties.Buurt_code.slice(1, 5)})
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
		});


update(-10)

});


d3.select("#nYear").on("input", function() {
  update(+this.value,'year');
});
d3.select("#nMonth").on("input", function() {
  update(+this.value,'month');
});

function update(val,t) {
	if (t =='year'){
		currentYear = val
	}
	if (t =='month'){
		currentMonth = val
	}
d3.csv("data/permonth.csv", function(data) {
	
function isCorrectYear(d) {
  return d.year==String(currentYear); //year
}
function isCorrectMonth(d) {
  return d.month==currentMonth; //month
}

var data = data.filter(isCorrectYear);
var data = data.filter(isCorrectMonth);

for (i = 0; i < data.length; i++) { 

g.selectAll('path').filter(' .n'+data[i]['code']).style('fill', d3.rgb(255-data[i]['number_of_incidents']*25,0,25))

}
d3.select('#month').text('Month: '+ String(currentMonth))
d3.select('#year').text('Year: '+ String(currentYear))
});
}

