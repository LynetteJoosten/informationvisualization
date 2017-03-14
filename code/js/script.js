var width = 1300,
    height = 500,
	centered,
	div;

var svg = d3.select('#svgContainer').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geoMercator()
    .scale(110000)
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
var showvar = 0;
d3.select('#nMonth').style('opacity',0)

d3.json('geojson/adamBuurtenExWater.geojson', function(error, mapData) {
    var features = mapData.features;

  
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

});



update(2015,2,'Dienstverlening',1)
function isCorrectYear(d) {
  return d.year==String(currentYear); //year
}
function isCorrectMonth(d) {
  return d.month==currentMonth; //month
}
function isCorrectCategory(d) {
  return d.incident_category==currentCat; 
}
function isCorrectPrio(d){
	return d.incident_prio==currentPrio;
}
function update(currentYear,currentMonth,currentCat,currentPrio) {
d3.csv("data/flatmetbuurten.csv", function(data) {

	dict = {}
	
	for (i = 0; i < data.length; i++) { 
	data[i]['year'] = data[i]['incident_timestamp'].split('/')[0]
	data[i]['month'] = data[i]['incident_timestamp'].split('/')[1]
	data[i]['group'] = data[i]['neighborhood_id_ams']+'--'+String(data[i]['year'])+'--'+String(data[i]['month'])
	
	}
console.log(currentYear,currentMonth,currentCat,currentPrio)
var data = data.filter(isCorrectYear);

var data = data.filter(isCorrectMonth);

//var data = data.filter(isCorrectPrio);
//var data = data.filter(isCorrectCategory);
	for (i = 0; i < data.length; i++) { 

	dict[data[i]['group']] = 0
	
	}
	for (i = 0; i < data.length; i++) { 

	dict[data[i]['group']] ++
	
	}
	total = 0
for (var key in dict) {

g.selectAll('path').filter(' .n'+key.split('--')[0]).style('fill', d3.rgb(dict[key]*25,25,25))
total += dict[key]
}
d3.select('#year').text('Year: '+ String(currentYear))
d3.select('h1').text('Total number of incidents: '+ String(total))
})
}


