/*
 We take the reference of Mike Bostock’s work: https://bl.ocks.org/mbostock/7607999

 */
$(document).ready(function() {
    var diameter = 870,
        radius = diameter / 2,
        innerRadius = radius - 180;

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function (d) {
            return d.size;
        });
    var colors = ["#07d603","#d6b90d","#4091d6","#d61f2a","#8758d6"];

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.85)
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / 180 * Math.PI;
        });
    var left = 470;
    var top = 400;
    var svg = d3.select("#connection").append("svg")
        .attr("width", diameter + 300)
        .attr("height", diameter + 50)
        .append("g")
        .attr("transform", "translate(" + left + "," + top + ")");

    svg.append('text')
        .text('Close')
        .attr("class", "connectiontext")
        .attr('x', left-135)
        .attr('y', top - 730);

    svg.append('text')
        .text('Very Close')
        .attr("class", "connectiontext")
        .attr('x', left+100)
        .attr('y', top - 730);

    var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");

    var colorScale = d3.scale.quantile()
        .domain([0, 5 - 1, 20])
        .range(colors);
    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function(d, i) { return 60 * i + 330; })
        .attr("y", top - 770)
        .attr("width", 60)
        .attr("height", 40 / 2)
        .style("fill", function(d, i) { return colors[i]; });

    d3.json("data/schoolConnection.json", function (error, classes) {
        if (error) throw error;
        var tooltip = d3.tip()
            .attr('class', 'tooltip');

        svg.call(tooltip);
        //console.log(classes);
        var nodes = cluster.nodes(packageHierarchy(classes)),
            links = packageImports(nodes);

        link = link
            .data(bundle(links))
            .enter().append("path")
            .each(function (d) {
                d.source = d[0], d.target = d[d.length - 1];
            })
            .attr("class", "link")
            .attr("d", line);
        var color = d3.scale.category20();
        var circle = node.data(nodes.filter(function (n) {
                return !n.children;
            }))
            .enter().append("circle")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "rotate(" + (d.x - 90) + ")translate(" + (d.y - 1) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
            })
            .attr("r", 6)
            .style("fill", function (d, i) {
                return color(i);
            });

        node = node
            .data(nodes.filter(function (n) {
                return !n.children;
            }))
            .enter().append("text")
            .attr("class", "node")
            .attr("dy", ".31em")
            .attr("transform", function (d) {
                return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
            })
            .style("text-anchor", function (d) {
                return d.x < 180 ? "start" : "end";
            })
            .text(function (d) {
                return d.key;
            })
            .on("mouseover", function (d) {
                return mouseovered(d, tooltip)
            })
            .on("mousemove", function () {
                return tooltip.style("top", top + 460 + "px").style("left", left + 440+ "px");
            })
            .on("mouseout", function (d) {
                return mouseouted(d, tooltip)
            });


    });

    function mouseovered(d, tooltip) {
        node
            .each(function (n) {
                n.target = n.source = false;
            });

        link
            .classed("link--level1", function (l) {
                if (l.target == d || l.source === d) {
                    var universityName = l.source.key;
                    var indexInList = d.imports.indexOf(universityName);
                    var numOfPaper = d.Number[indexInList];

                    if (numOfPaper < 20) {
                        if (l.target == d) {
                            return l.source.source = true;
                        } else if (l.source === d) {
                            return l.target.target = true;
                        }
                    }
                }
            })
            .classed("link--level2", function (l) {
                if (l.target == d || l.source === d) {
                    var universityName = l.source.key;
                    var indexInList = d.imports.indexOf(universityName);
                    var numOfPaper = d.Number[indexInList];

                    if (numOfPaper >= 20 && numOfPaper < 35) {
                        if (l.target == d) {
                            return l.source.source = true;
                        } else if (l.source === d) {
                            return l.target.target = true;
                        }
                    }
                }
            })
            .classed("link--level3", function (l) {
                if (l.target == d || l.source === d) {
                    var universityName = l.source.key;
                    var indexInList = d.imports.indexOf(universityName);
                    var numOfPaper = d.Number[indexInList];

                    if (numOfPaper >= 35 && numOfPaper < 50) {
                        if (l.target == d) {
                            return l.source.source = true;
                        } else if (l.source === d) {
                            return l.target.target = true;
                        }
                    }
                }
            })
            .classed("link--level4", function (l) {
                if (l.target == d || l.source === d) {
                    var universityName = l.source.key;
                    var indexInList = d.imports.indexOf(universityName);
                    var numOfPaper = d.Number[indexInList];

                    if (numOfPaper >= 50 && numOfPaper < 65) {
                        if (l.target == d) {
                            return l.source.source = true;
                        } else if (l.source === d) {
                            return l.target.target = true;
                        }
                    }
                }
            })
            .classed("link--level5", function (l) {
                if (l.target == d || l.source === d) {
                    var universityName = l.source.key;
                    var indexInList = d.imports.indexOf(universityName);
                    var numOfPaper = d.Number[indexInList];

                    if (numOfPaper >= 65) {
                        if (l.target == d) {
                            return l.source.source = true;
                        } else if (l.source === d) {
                            return l.target.target = true;
                        }
                    }
                }
            })

            /*
             .classed("link--source", function(l) {
             if (l.source === d) {
             console.log(d)
             return l.target.target = true;
             }
             })
             */
            .filter(function (l) {
                return l.target === d || l.source === d;
            })
            .each(function () {
                this.parentNode.appendChild(this);
            });

        node
            .classed("node--target", function (n) {
                return n.target;
            })
            .classed("node--source", function (n) {
                return n.source;
            });
        //console.log(d.Number);

        var string = "";
        for (var i = 0; i < d.Number.length; i++) {
            string += d.imports[i] + ': ' + d.Number[i] + '<br>'
        }
        //console.log(string)
        /*
         d.imports.forEach(function(d) {
         console.log(d)
         university += ('<br>'+d +': ' +'<br>' );
         });
         d.number.forEach(function (d) {
         number += d;
         });
         **/
        var txt = '<h2>' + d.name + '</h2>' + string;

        tooltip.html(txt).show();
    }

    function mouseouted(d, tooltip) {

        link
            .classed("link--level1", false)
            .classed("link--level2", false)
            .classed("link--level3", false)
            .classed("link--level4", false)
            .classed("link--level5", false)
        //.classed("link--source", false);

        node
            .classed("node--target", false)
            .classed("node--source", false);
        tooltip.hide()
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || {name: name, children: []};
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function (d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function (d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function (d) {
            if (d.imports) d.imports.forEach(function (i) {
                imports.push({source: map[d.name], target: map[i]});
            });
        });

        return imports;
    }

});