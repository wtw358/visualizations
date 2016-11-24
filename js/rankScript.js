/*
 We take the reference of CS1951a lab D3: http://cs.brown.edu/courses/csci1951-a/labs/d3/d3_lab.html
 */
$(document).ready(function() {
    d3.csv("data/output_profRank.csv", function(dataset) {

        var recBegin = 500,
            amplify_coeff = 4;
        var margin = {top: 100, left: 400};

        var svg = d3.select("#rank")
            .append("svg")
            .attr("width", 900)
            .attr("height", 900)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var bars = svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g");


        bars.append("text")
            .attr("x", 100)
            .attr("y", function(d, i) {return 15 * i + 20;})
            .attr("dy", ".05em")
            .text(function(d) { return d.University; });

        bars.append("rect")
            .attr("x", recBegin)
            .attr("y", function(d,i) {return 15 *i + 10;})
            .attr("width", function(d) {return +d.Full * amplify_coeff;})
            .attr("height", 10)
            .attr("fill", "LightBlue");

        bars.append("rect")
            .attr("x", function(d) {return +d.Full * amplify_coeff + recBegin;} )
            .attr("y", function(d,i) {return 15 *i + 10;})
            .attr("width", function(d) {return +d.Associate * amplify_coeff;})
            .attr("height", 10)
            .attr("fill", "SteelBlue");

        bars.append("rect")
            .attr("x", function(d) {return (+d.Full + +d.Associate) * amplify_coeff + recBegin;} )
            .attr("y", function(d,i) {return 15 *i + 10;})
            .attr("width", function(d) {return +d.Assistant * amplify_coeff;})
            .attr("height", 10)
            .attr("fill", "DarkBlue");

        bars.append("rect")
            .attr("x", 200 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "LightBlue");

        bars.append("text")
            .attr("x", 220)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Professor");

        bars.append("rect")
            .attr("x", 300 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "SteelBlue");

        bars.append("text")
            .attr("x", 320)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Associate");

        bars.append("rect")
            .attr("x", 400 )
            .attr("y", 850)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "DarkBlue");

        bars.append("text")
            .attr("x", 420)
            .attr("y", 857)
            .attr("dy", ".35em")
            .text("Assistant");
    });
});