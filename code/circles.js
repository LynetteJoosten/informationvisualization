

var dataglob;
year = 2005;
d3.csv("perpriobuurtjaar.csv", function(data) {
dataglob = data
createData(dataglob)
  
}); 




function createData(dataset){
   areas = []
   for (i = 0; i < dataset.length; i++) { 
        if (dataset[i].year == year){
        x = (Math.random() * (1 - 0) + 0).toFixed(2);
        areas.push([dataset[i].neighborhood_name_ams, dataset[i].incident_prio,x])
      }
    }
 
 drawPoints(areas)

};


function drawPoints(data){
  
  /*https://www.dashingd3js.com/creating-svg-elements-based-on-data*/
  circleRadii = [5, 4, 3, 2, 1]
  radiusSize = 60
  placeX = 600
  placeY = 300
  document.getElementById("year").innerHTML = year;

 var transition = d3.transition();
 

  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong><span style='color:black'>" + d[0] + "</span></strong> ";
               })

 
  var svg = d3.select("body").append("svg")
                                     .attr("width", 1000)
                                     .attr("height", 1000);
  svg.call(tip);
 
  var circles = svg.selectAll("circle")
                             .data(circleRadii)
                             .enter()
                             .append("circle")

  var circleAttributes = circles
                       .attr("cx", placeX)
                       .attr("cy", placeY)
                       .attr("r", function (d) { return d*radiusSize; })
                       .style("fill", function(d) {
                              var returnColor;
                              if (d === 5) { returnColor = "#F6CECE";
                              } else if (d === 3) { returnColor = "#FA5858";
                              } else if (d === 4) { returnColor = "#F5A9A9";
                              } else if (d === 2) { returnColor = "#FE2E2E"; 
                              }else if (d === 1) { returnColor = "#DF0101"; }
                              return returnColor;});

  /*http://alignedleft.com/tutorials/d3/making-a-scatterplot*/
  var points = svg.selectAll(".point")
                            .data(data)
                            .enter()
                            
                            .append("circle")

                            .attr("cx", function(d) {
                            return ((d[1]*radiusSize -10)*Math.cos(2 * Math.PI * d[2] ))+placeX; })
                            .attr("cy", function(d) {
                            return ((d[1]*radiusSize -10)*Math.sin(2 * Math.PI * d[2]))+placeY; })
                            .attr("r", 3)

                            .on('mouseover', tip.show)
                            .on('mouseout', tip.hide) 
                            .style("opacity", 0.0)
                            
                            .transition()
                            .duration(4000)
                            .style("opacity", 0.7)
                            .style("fill", "black")

}; /*end function drawpoints*/


d3.select("#nYear").on("input", function() {
  updateData(+this.value);
 
});
//Function that updates the data for each year  
function updateData(val, val2) {
  year = val;
  //First remove the previous content of the barchart
  d3.select("svg").remove();
  createData(dataglob, year)
  //Calls to draw the bar chart for the new year 
  
  
};




