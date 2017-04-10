var width = "100%";

var svg = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",window.innerHeight);

var projection = d3.geo.mercator()
                        .translate([780,360])
                        .scale(300);

var path = d3.geo.path()
                    .projection(projection); 

d3.json("https://d3js.org/world-50m.v1.json",function(json){
   svg.selectAll("path")
        .data(topojson.feature(json, json.objects.countries).features)
        .enter()
            .append("path")
            .attr('fill', '#95E1D3')    
            .style("opacity", 0.75)
            .attr('stroke', 'black')
            .attr("d",path);

    d3.json("https://data.nasa.gov/resource/y77d-th95.geojson",function(json){
        svg.selectAll("circle")
            .data(json.features)
            .enter()
                .append("circle")
                .attr("cx",function(d){
                    return projection([d.properties.reclong,d.properties.reclat])[0];
                })     
                .attr('cy', function(d) { 
                    return projection([d.properties.reclong,d.properties.reclat])[1] 
                }) 
                .attr("r",function(d){
                    var range = 718750/2/2; 

                    if (d.properties.mass <= range) return 2;
                    else if (d.properties.mass <= range*2) return 10;
                    else if (d.properties.mass <= range*3) return 20;
                    else if (d.properties.mass <= range*20) return 30;
                    else if (d.properties.mass <= range*100) return 40;
                    return 50;
                }) 
                .style("fill", "blue")
                .style('opacity', 0.5)
                .attr('stroke-width', 1)
                .attr('stroke', 'red')
                .on("mouseover",function(){
                    d3.select(this)
                        .append("title")
                     .text(function(d){
                        var name = d.properties.name;
                        var long = d.properties.reclong;
                        var lat = d.properties.reclat;
                        var result = "Name: " + name + "\n" +
                                "Longitude: " + long + "\n" +
                                "Latitude: " + lat;
                                
                                    
                        return result;
                    })
                });
    
    });

});

