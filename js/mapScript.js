/*
 We take the reference of Mike Bostock’s work: https://bl.ocks.org/mbostock/29cc3cc4078091fd2115
*/

$(document).ready(function() {

    var stateGrid = {   
"ME" : [0, {}, []],
"WI" : [0, {}, []],
"VT" : [0, {}, []],
"NH" : [0, {}, []],
"WA" : [0, {}, []],
"ID" : [0, {}, []],
"MT" : [0, {}, []],
"ND" : [0, {}, []],
"MN" : [0, {}, []],
"IL" : [0, {}, []],
"MI" : [0, {}, []],
"NY" : [0, {}, []],
"MA" : [0, {}, []],
"OR" : [0, {}, []],
"NV" : [0, {}, []],
"WY" : [0, {}, []],
"SD" : [0, {}, []],
"IA" : [0, {}, []],
"IN" : [0, {}, []],
"OH" : [0, {}, []],
"PA" : [0, {}, []],
"NJ" : [0, {}, []],
"CT" : [0, {}, []],
"RI" : [0, {}, []],
"CA" : [0, {}, []],
"UT" : [0, {}, []],
"CO" : [0, {}, []],
"NE" : [0, {}, []],
"MO" : [0, {}, []],
"KY" : [0, {}, []],
"WV" : [0, {}, []],
"VA" : [0, {}, []],
"MD" : [0, {}, []],
"DE" : [0, {}, []],
"AZ" : [0, {}, []],
"NM" : [0, {}, []],
"KS" : [0, {}, []],
"AR" : [0, {}, []],
"TN" : [0, {}, []],
"NC" : [0, {}, []],
"SC" : [0, {}, []],
"OK" : [0, {}, []],
"LA" : [0, {}, []],
"MS" : [0, {}, []],
"AL" : [0, {}, []],
"GA" : [0, {}, []],
"HI" : [0, {}, []],
"AK" : [0, {}, []],
"TX" : [0, {}, []],
"FL" : [0, {}, []],
"DC" : [0, {}, []],
};
/*
form {
position: relative;
  left:30px;
  top:20px;
  }
*/
var width = 850,
    height = 600;

var margin = {top: 0, left: 40};
var svg = d3.select("#twangchart").append("svg")
              .attr("width", width)
              .attr("height",height)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var stateInfo = [];
var patt = /\w+/g;
var result;

var gridsize = 40;
  
var title = svg.append("text")
              .attr("class", "twangtitle")
              .attr("x", width/5)
              .attr("y",40)
              .text("Number of Top 55 Universities' CS Professor in Different States");
var title = svg.append("text")
              .attr("class", "twangsubtitle")
              .attr("x", width/4+60)
              .attr("y",60)
              .text("(move mouse on the state to see detail)");


d3.tsv("data/ProfInfo.tsv", function(record) {
  console.log(record.length);
  
  for (var i = 0; i < record.length; i++) {
      var stateName = record[i].State;
      var UniName = record[i].University;
      
      stateGrid[stateName][0] += 1;
      if (!(UniName in stateGrid[stateName][1])) {
        stateGrid[stateName][1][UniName] = 1;
              
      }
      else {
        stateGrid[stateName][1][UniName] += 1;
      }
      
  }
    //console.log(stateGrid["AZ"])
      
  for (var key in stateGrid) {
    var temp = stateGrid[key][1];
    tempString = "Professor Number: " + stateGrid[key][0] +"<br>";
    for (var s in temp) {
      tempString = tempString + s+": " + temp[s] +"<br>"
    }
    stateGrid[key][2].push(tempString)
    //console.log(tempString)
  }
  console.log(stateGrid["AZ"]);

  d3.select("#grid").text().split("\n").forEach(function(line, i) {
    while (result = patt.exec(line)) {
      stateInfo.push({
        sName: result[0], 
        xParameter: result.index/2.9, 
        yParameter: i, 
        proNum:  stateGrid[result[0]][0],
        detail: stateGrid[result[0]][2]     
      })
      //console.log(stateGrid[result[0]][2])
     }
   });

  
    var USstate = svg.append("g")
                .attr("transform", "translate("+width/4+","+height/8+")")
                .selectAll(".USstate") //have to 
                .data(stateInfo)
                .enter()
                .append("g")
                .attr("class","USstate")
                .attr("transform", function(d) {
                  return "translate("+(d.xParameter)*gridsize+","+(d.yParameter)*gridsize+")"});
                

      var tooltip = d3.tip()
            .attr('class', 'twangtooltip')
            .html(function(d) {return d.detail});
            
      svg.call(tooltip);

     

      var statelist = [];
      for (var i = 0;i<stateInfo.length;i++) {
          statelist.push(stateInfo[i].proNum);
      }
      //console.log(d3.min(EnvirVF_list, function(d) {return d}))
      var smallest = d3.min(statelist, function(d) {return d});
      var largest =  d3.max(statelist, function(d) {return d});
      var middle = smallest +(largest-smallest)/5;
      var colorScale = d3.scale.linear()
                       .domain([smallest,middle, largest])
                       .range([  "#70e1f5","yellow","red"]);
      
      
      var card = USstate.append("rect")
                .attr("x", -gridsize / 2)
                .attr("y", -gridsize / 2 - 6)
                .attr("width", gridsize )
                .attr("height", gridsize -1)
                .style("fill",function(d) {return colorScale(d.proNum)});
                

      var stateText = USstate.append("text")
              .text(function(d) {return d.sName})
              .on('mouseover', tooltip.show)
              .on("mousemove", function(){return tooltip.style("top", 160+"px").style("left",740+"px");})
             .on('mouseout', tooltip.hide);

      var gradient1 = svg.append("defs")
                  .append("linearGradient")
                    .attr("id", "gradient1")
                    .attr("x", "0%")
                    .attr("y", "0%");

      gradient1.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#70e1f5")
        .attr("stop-opacity", 1);

      gradient1.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "yellow")
          .attr("stop-opacity", 1);

      var legend1 = svg.append("rect")
                .attr("class","twanglegend")
                .attr("x",width/4)
                .attr("y", height-165)
                .attr("width", width/4)
                .attr("height", 30)
                .style("fill", "url(#gradient1)");

      var gradient2 = svg.append("defs")
        .append("linearGradient")
          .attr("id", "gradient2")
          .attr("x", "0%")
          .attr("y", "0%")

      gradient2.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "yellow")
        .attr("stop-opacity", 1);

      gradient2.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "red")
          .attr("stop-opacity", 1);

      var legend2 = svg.append("rect")
                .attr("class","twanglegend")
                .attr("x",width/4+width/4)
                .attr("y", height-165)
                .attr("width", width/4)
                .attr("height", 30)
                .style("fill", "url(#gradient2)");
      
      xScale1 = d3.scale.linear()
                       .domain([smallest, middle])
                       .range([ width/4-1,(width/4+width/4)]);
      
      var axis1 = d3.svg.axis()
              .scale(xScale1)
              .tickValues([smallest,20,40,60, middle])
              .orient("bottom");


       svg.selectAll("a").remove();
       svg.append("a").attr("class","twangaxis1")
           .attr("transform","translate(0,"+ (height-140)+")")
           
           .call(axis1);

       xScale2 = d3.scale.linear()
                       .domain([middle, largest])
                       .range([ (width/4+width/4)-1,(width/4+width/2)]);
      
      var axis2 = d3.svg.axis()
              .scale(xScale2)
              .tickValues([ 140,220,310,largest])
              .orient("bottom")
              .tickFormat(d3.format("d"));


       svg.selectAll("a")
       svg.append("a").attr("class","twangaxis2")
           .attr("transform","translate(0,"+ (height-140)+")")
          
           .call(axis2);
    

    })
 });


