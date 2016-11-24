/*
 We take the reference of CS1951a lab D3: http://cs.brown.edu/courses/csci1951-a/labs/d3/d3_lab.html
 */
$(document).ready(function() {

    d3.csv("data/output_researchArea.csv", function(dataset) {

        var     rec1Begin = 510,
        //rec2Begin = 100,
            my_amplify = 4;

        var svg = d3.select("#area")
            .append("svg")
            .attr("width", 1500)
            .attr("height", 4000);


        var verticalAmp = 15;
        var bars = svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g");

        bars.append("text")
            .attr("x", 100)
            .attr("y", function(d, i) {return verticalAmp * i + 20;})
            .attr("dy", ".35em")
            .text(function(d) { return d.University; });

        bars.append("rect")
            .attr("x", rec1Begin)
            .attr("y", function(d,i) {return verticalAmp *i + 10;})
            .attr("width", function(d) {return +d.Theory * my_amplify;})
            .attr("height", 10)
            .attr("fill", "#3498DB");

        //var rec2Begin = rec1Begin + (+d.Won * my_amplify);

        bars.append("rect")
            .attr("x", function(d) {return +d.Theory * my_amplify + rec1Begin;} )
            .attr("y", function(d,i) {return verticalAmp *i + 10;})
            .attr("width", function(d) {return ( +d.DataScienceCounter) * my_amplify;})
            .attr("height", 10)
            .attr("fill", "#52BE80");

        bars.append("rect")
            .attr("x", function(d) {return +d.Theory * my_amplify + rec1Begin + ( +d.DataScienceCounter) * my_amplify;} )
            .attr("y", function(d,i) {return verticalAmp *i + 10;})
            .attr("width", function(d) {return ( +d.Scientific) * my_amplify;})
            .attr("height", 10)
            .attr("fill", "#DAF7A6");

        bars.append("rect")
            .attr("x", function(d) {return +d.Theory * my_amplify + rec1Begin + ( +d.DataScienceCounter) * my_amplify + ( +d.Scientific) * my_amplify;} )
            .attr("y", function(d,i) {return verticalAmp *i + 10;})
            .attr("width", function(d) {return ( +d.Systems) * my_amplify;})
            .attr("height", 10)
            .attr("fill", "#F9E79F");

        bars.append("rect")
            .attr("x", function(d) {return +d.Theory * my_amplify + rec1Begin + ( +d.DataScienceCounter) * my_amplify + (+d.Scientific) * my_amplify + ( +d.Systems) * my_amplify;} )
            .attr("y", function(d,i) {return verticalAmp *i + 10;})
            .attr("width", function(d) {return ( +d.Informatics) * my_amplify;})
            .attr("height", 10)
            .attr("fill", "#16A085");


        bars.append("rect")
            .attr("x", 200 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "#3498DB");

        bars.append("text")
            .attr("x", 220)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Theory & Algorithm");

        bars.append("rect")
            .attr("x", 400 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "#52BE80");

        bars.append("text")
            .attr("x", 420)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Data Science & Machine Learning");

        bars.append("rect")
            .attr("x", 670 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "#DAF7A6");

        bars.append("text")
            .attr("x", 690)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Scientific Computing");

        bars.append("rect")
            .attr("x", 200 )
            .attr("y", 870)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "#F9E79F");

        bars.append("text")
            .attr("x", 220)
            .attr("y", 877)
            .attr("dy", ".35em")
            .text("Systems & Architecture & Networks");

        bars.append("rect")
            .attr("x", 500 )
            .attr("y", 870)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "#16A085");

        bars.append("text")
            .attr("x", 520)
            .attr("y", 877)
            .attr("dy", ".35em")
            .text("Informatics");
        /*
         bars.append("text")
         .attr("x", function(d) {return +d.Won * my_amplify + rec1Begin + ((+d.Nominated - +d.Won) * my_amplify) + 3 ;})
         .attr("y", function(d, i) {return 30 * i + 20;})
         .attr("dy", ".35em")
         .text(function(d) { return d.Nominated; });
         */

    });

});