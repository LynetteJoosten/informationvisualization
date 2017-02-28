var width = 1000,
    height = 680;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("geojson/amsterdamBuurten.json", function(error, data) {
    if (error) return console.error(error);
	console.log(data)
	
	var neighborhoods = topojson.feature(data, data.objects.Buurten_region);
	
	var projection = d3.geoMercator()
		.scale(100)
		.center([4.889000, 52.355399])
		.translate([width / 2, height / 2]);
		
	var path = d3.geoPath()
		.projection(projection);
	
    svg.append("path")
		.datum(neighborhoods)
		.attr("d", path);
});