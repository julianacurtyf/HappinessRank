
// --------------------- FUNCTIONS DEFINITION ---------------------

function updateWindow() {

    // Function to update the window and change the size and the projection of the map

    x = w.innerWidth;
    y = w.innerHeight + 150;

    projection = d3.geoMercator()
        .scale(x * 0.165)
        .translate([x / 2, y / 2])

    svg.attr("width", x).attr("height", y);
    svg.select('#map').attr("width", x).attr("height", y).selectAll("path").attr("d", d3.geoPath().projection(projection));
    svg.select('#legend').attr("y", y / 2)
}

function write(group, xPos, yPos, text, i) {

    // Function to append and write a text to a respective svg group. Takes as input the svg, the x and y position, the text and
    // an id to differentiate the information, and consequently be capable of changing it when we change the country or attribute

    group.selectAll('#rank-text' + i).remove();

    group
        .append("text")
        .text(text)
        .attr('id', 'rank-text' + i)
        .attr("x", xPos)
        .attr("y", yPos)
        .style("fill", 'white')
        .style("font-size", '1.5em')
        .style("font-spacing", '0.3em');
}

function happyFace(group, xPos, yPos, radius) {

    // Function to draw a happy face. It takes as input the svg group where we will add the face, also the x and y position
    // and the radius of the face

    var arc = d3.arc()
        .startAngle(1.2 * (Math.PI / 2))
        .endAngle(2.8 * (Math.PI / 2))
        .innerRadius(radius / 2)
        .outerRadius(radius / 2.2);

    group.append("circle")
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", radius)
        .style("fill", "yellow");

    //left eye
    group.append("circle")
        .attr("cx", xPos - radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //right eye
    group.append("circle")
        .attr("cx", xPos + radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //mouth
    group.append("path")
        .attr("d", arc)
        .attr("transform", "translate(" + xPos + "," + yPos + ")");
}

function sadFace(group, xPos, yPos, radius) {

    // Function to draw a sad face. It takes as input the svg group where we will add the face, also the x and y position
    // and the radius of the face

    var arc = d3.arc()
        .startAngle(1.2 * (Math.PI / 2))
        .endAngle(2.8 * (Math.PI / 2))
        .innerRadius(radius / 2.2)
        .outerRadius(radius / 2);

    group.append("circle")
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", radius)
        .style("fill", "yellow");

    //left eye
    group.append("circle")
        .attr("cx", xPos - radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //right eye
    group.append("circle")
        .attr("cx", xPos + radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //mouth
    group.append("path")
        .attr("d", arc)
        .attr("transform", "translate(" + xPos + "," + (yPos + radius / 2) + "), rotate(180)");
}

function neutralFace(group, xPos, yPos, radius) {

    // Function to draw a neutral face. It takes as input the svg group where we will add the face, also the x and y position
    // and the radius of the face

    group.append("circle")
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", radius)
        .style("fill", "yellow");

    //left eye
    group.append("circle")
        .attr("cx", xPos - radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //right eye
    group.append("circle")
        .attr("cx", xPos + radius / 3)
        .attr("cy", yPos - radius / 3)
        .attr("r", radius / 8)
        .style("fill", "black");

    //mouth
    group.append("rect")
        .attr("x", xPos - radius / 2)
        .attr("y", yPos + radius / 3)
        .attr("width", radius)
        .attr("height", 1)
        .style("fill", "black");
}

function drawLegend(group, color_data, text_data, function_to_fill, title, pos_x, pos_y) {

    // Function to draw a legend. It takes as input the svg group where we will add the legend box, the array of the colors and
    // their respective text, the function to correlate the colors to the text, the title of the legend and finally, it x and y 
    // position

    var legend = group
        .append('g')
        .attr("id", "legend")
        .attr("x", 20)
        .attr("y", y / 2)
        .attr("width", 30)
        .attr("height", 100)

    legend
        .selectAll('rect')
        .data(color_data)
        .enter()
        .append('rect')
        .attr("x", pos_x)
        .attr("y", function (d, i) { return pos_y + i * 20; })
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", function (d, i) { return function_to_fill(d); })
        .style("stroke", 'white')
        .style("stroke-width", '1');

    legend.selectAll('g')
        .data(text_data)
        .enter()
        .append('text')
        .text(function (d, i) { return d })
        .attr("x", pos_x + 20)
        .attr("y", function (d, i) { return (pos_y + 10 + i * 20); })
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", 'white')
        .style("font-size", '0.8em')
        .style("font-spacing", '0.3em');

    legend
        .append("text")
        .text(title)
        .attr("x", pos_x)
        .attr("y", pos_y - 15)
        .style("fill", 'white')
        .style("font-size", '0.9em')
        .style("font-spacing", '0.3em');
}

function updateMap(x, y) {

    // Function to change the size and the projection of the map when we update the size of the window

    projection = d3.geoMercator()
        .scale(x * 0.165)
        .translate([x / 2, y / 3])

    svg.attr("width", x).attr("height", y);
    svg.select('#map').attr("width", x).attr("height", y).selectAll("path").attr("d", d3.geoPath().projection(projection));
    svg.select('#legend').attr("y", 0)
}

function drawGraph(group, country, data, max_value, atributos_select, pos_y, legend) {

    // Function to draw the graph: takes as input the svg group where we will add the graph, the country that we are going to extract
    // information to build the graph, the data (csv) with the happiness information, the maximum value for the y axis the attributes 
    // that we will use in the graphs, the position of the graph in the svg, and finally, a boolean to add (or not) a legend

    let chart_width = 600;
    let chart_height = 350;
    let array_points = [];
    let data_country = data[1].filter(o => o.code == country.id);

    let country_order = data_country.sort(function (x, y) {
        return d3.ascending(x.index, y.index);
    })

    let max_date = d3.max(country_order, function (d) {
        return d.year
    })

    let min_date = d3.min(country_order, function (d) {
        return d.year
    })

    let chartContainer = d3.select(group)
        .attr("width", chart_width)
        .attr("height", chart_height);

    let chart = chartContainer.append("g")
        .attr("transform", "translate(50," + pos_y + ")");


    let yScale = d3.scaleLinear()
        .domain([0, max_value + 1])
        .range([chart_height / 2, 0]);

    let yAxis = d3.axisLeft()
        .scale(yScale);

    let xScale = d3.scaleLinear()
        .nice()
        .domain([min_date - 1, max_date + 1])
        .range([0, chart_width / 2]);

    let xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format('d'))
        .ticks(5)

    let line = d3.line()
        .x(function (item) { return xScale(item.year) })
        .y(function (item) { return yScale(item.valor) })
        .curve(d3.curveMonotoneX)

    chartContainer.selectAll("#xeixos")
        .remove()

    chartContainer.append("g")
        .attr("transform", "translate(50," + (pos_y + 175) + ")")
        .attr("id", "xeixos")
        .call(xAxis);

    chartContainer.selectAll("#yeixos")
        .remove()

    chartContainer.append("g")
        .attr('transform', "translate(50," + pos_y + ")")
        .attr("id", "yeixos")
        .call(yAxis);

    atributos_select.forEach(function (atb) {
        var atributo = {};
        atributo["atributo"] = atb;
        atributo["timeserie"] = [];
        array_points.push(atributo);

        data_country.forEach(function (item) {
            var points = {};
            points["year"] = item.year
            points["valor"] = item[atb]

            atributo["timeserie"].push(points)
        })
    })

    chartContainer.selectAll(".line")
        .remove()

    chart.selectAll("path")
        .data(array_points)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", function (item) {
            return line(item.timeserie);
        })
        .attr("stroke", function (item, i) {
            return colorScaleGraph(item.atributo);
        })
        .style("stroke-width", 2)
        .style("fill", "none")

    chartContainer.selectAll('.circulos')
        .remove()

    let circulos = chart.selectAll(".circulos")
        .data(array_points)
        .enter()
        .append("g")
        .attr("class", "circulos")
        .style("stroke", function (item, i) {
            return colorScaleGraph(item.atributo);
        })

    circulos.selectAll('g.circulos')
        .data(function (d) {
            return d.timeserie;
        })
        .enter()
        .append('circle')
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (item) { return xScale(item.year) })
        .attr("cy", function (item) { return yScale(item.valor) })
        .attr('fill', 'black')
        .on("mouseover", function (d, ix) {
            d3.select(group)
                .append('text')
                .attr('id', 'value')
                .text(ix.valor)
                .attr("transform", "translate(" + xScale(ix.year + 1) + "," + yScale((ix.valor - max_value * 1.05)) + ")")
                .attr("fill", 'white')
                .style("font-size", '1em')
                .style("color", 'white')
                .style("font-spacing", '0.5em');
        })
        .on("mouseout", function (d, i) {
            d3.select(group).selectAll("#value")
                .remove()
        })

    if (legend == 1) {

        chartContainer.selectAll('#legend').remove();

        drawLegend(chartContainer, legend_chart, legend_chart, colorScaleGraph, '', 330, 80)
    }

}

function createDrawer(group, i) {

    // Function to create the drawer on the right side of the page where we can visualize all the information regarding 
    // the happiness of a country. This drawer occupies one third of the window

    d3.select(group)
        .style('width', x / 3 + 'px')
        .style('height', y * 1.0875 + 'px')
        .style("opacity", 1)
        .style('left', 2 * x / 3 + 'px')

    d3.select(group).select('h2').text('Analysis - ' + i.properties.name)

}

function drawFaces(data, i) {

    // Funtion to draw all the faces depending on the values of happiness score. It also draws the rank position and the
    // respective year.

    let data_country = data[1].filter(o => o.code == i.id)

    var atributo = [];

    var rank = d3.select("#rank")
        .attr("width", 200)
        .attr("height", 300)
        .style('margin-top', '0px');

    data_country.forEach(function (item, i) {

        if (parseInt(item['rank']) < 30) {

            happyFace(rank, 170, 15 + i * 50, 15);
            write(rank, 110, 25 + i * 50, item['rank'] + '°', i);
            write(rank, 50, 25 + i * 50, item['year'] + ' -', i + 11);
        }
        else if (parseInt(item['rank']) < 70) {

            neutralFace(rank, 170, 15 + i * 50, 15);
            write(rank, 110, 25 + i * 50, item['rank'] + '°', i);
            write(rank, 50, 25 + i * 50, item['year'] + ' -', i + 11);
        }
        else {

            sadFace(rank, 170, 15 + i * 50, 15);
            write(rank, 110, 25 + i * 50, item['rank'] + '°', i);
            write(rank, 50, 25 + i * 50, item['year'] + ' -', i + 11);
        }
    })



}

function onChange(attr, atributos_select2) {

    // Function to change the graph depending on the checkbox selected as filter. It takes as input an array with the attributes selected, 
    // then changes it in case the user select the respective box.

    if (d3.select("#" + attr).property("checked") && !atributos_select2.includes(attr)) {
        atributos_select2.push(attr);
    }
    else if (atributos_select2.includes(attr)) {

        for (var i = 0; i < atributos_select2.length; i++) {

            if (atributos_select2[i] === attr) {

                atributos_select2.splice(i, 1);
            }

        }
    }
    return atributos_select2;
}

function drawMap(data) { // Main function

    // Main function - draw the map

    let map = svg.append("g")

        .attr("id", "map")
        .attr('width', x)
        .attr('height', y)
        .selectAll("path")
        .data(data[0]['features']) // data with the shapes
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection)) // draw the function with the projection
        .attr("fill", function (d) { // define athe color depending on the score
            if (data[1].find(o => o.code === d['id']) == undefined) {
                color = 'white'; // if we do not have information -> white
            }
            else {
                let line = data[1].find(o => o.code === d['id']);
                color = colorScale(line['score']);
            }
            return color;
        })
        .attr('id', function (d) { return "country" + d['id'] })
        .attr("class", "country")
        .style("stroke", 'black')
        .style("stroke-width", '0.2')
        .on("mousemove", function (d, i) { // mouse move -> shows the name of the country

            d3.select("#tooltip")
                .style('left', (d.pageX) + 'px')
                .style('top', (d.pageY + 10) + 'px')
                .style("opacity", 1);
            d3.select("#country").text(i.properties.name)
                .style('visibility', 'visible')
        })
        .on("mouseover", function (d) { // mouse over -> highlights the country

            d.target.setAttribute("style", "stroke: white; stroke-width: 1.5")
        })
        .on("mouseout", function (d) { // mouse out -> stroke back to normal and tooltip vanishes

            d.target.setAttribute("style", "stroke: #2E353E; stroke-width: 0.2")

            d3.select("#country")
                .style("visibility", "hidden")

            d3.select("#tooltip")
                .style("opacity", 0);
        })
        .on("click", function (d, i) { // click -> opens the drawer with the analysis 

            createDrawer('#menu', i);

            d3.selectAll('input').property('checked', true);

            var atributos_select = [];
            var atributos_select2 = ['economy', 'family', 'health', 'freedom', 'generosity', 'trust'];

            atributos_select.push("score");

            let max_score = d3.max(data[1], function (d) {
                return d.score
            })

            drawGraph("#linechart", i, data, max_score, atributos_select, 130, 0)

            drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)

            d3.select("#economy").on("change", function () {
                atributos_select2 = onChange("economy", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            d3.select("#family").on("change", function () {
                atributos_select2 = onChange("family", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            d3.select("#health").on("change", function () {
                atributos_select2 = onChange("health", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            d3.select("#freedom").on("change", function (){
                atributos_select2 = onChange("freedom", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            d3.select("#generosity").on("change", function () {
                atributos_select2 = onChange("generosity", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            d3.select("#trust").on("change", function () {
                atributos_select2 = onChange("trust", atributos_select2)
                drawGraph("#linechart2", i, data, 1, atributos_select2, 50, 1)
            });

            drawFaces(data, i)

            updateMap(2 * x / 3, y)
        })

    // Create the legend box

    drawLegend(svg, scale_number, scale_text, colorScale, 'Happiness Score: ', 20, 430)

}

// ----------------------------- MAIN -----------------------------

// Load the data

const geoMap = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const demographics = "general.csv";

// Define the dimension of the window

var w = window;
var x = w.innerWidth;
var y = w.innerHeight + 150;

// Create the fisrt svg

let svg = d3.select("#svg-map")
    .append('svg')
    .attr('width', x)
    .attr('height', y)

// Definition of scales

let scale_number = [3.5, 4, 5, 6, 6.5, 7, 7.5, 8, 9];
let scale_text = ['< 3.5', '3.5 - 4', '4 - 5', '5 - 6', '6 - 6.5', '6.5 - 7', '7 - 7.5', '7.5 - 8', '> 8'];
let legend_chart = ['economy', 'family', 'health', 'freedom', 'generosity', 'trust'];
let scale_graph = ['#4daf4a', '#377eb8', '#984ea3', '#ff7f00', '#ffff33', '#e41a1c'];

let colorScale = d3.scaleThreshold()
    .domain(scale_number)
    .range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#abd9e9', '#74add1', '#4575b4', '#313695']);

let colorScaleGraph = d3.scaleOrdinal()
    .domain(legend_chart)
    .range(scale_graph);

// Map and projection

let path = d3.geoPath();

let projection = d3.geoMercator()
    .scale(x / 2 / Math.PI)
    .translate([x / 2, y / 2])
    .center([7, (-15)]);

// Load dados externos para o array

let promises = [d3.json(geoMap),
                d3.csv(demographics, function (d) { 
                    return {country: d.Country, 
                            code: d.id, 
                            year: +d.Year, 
                            rank: +d.HappinessRank, 
                            score: +d.HappinessScore, 
                            economy: +d.Economy, 
                            family: +d.Family, 
                            health: +d.Health, 
                            freedom: +d.Freedom, 
                            generosity: +d.Generosity, 
                            trust: +d.Trust } })];

Promise.all(promises).then(drawMap);

d3.select(window).on('resize.updatesvg', updateWindow);



