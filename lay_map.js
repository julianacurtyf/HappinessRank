// the data
const geoMap = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const demographics = "general.csv";

// The svg
let svg = d3.select("#my_map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
// info: https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
let path = d3.geoPath();

// info: https://github.com/d3/d3-geo#projections
let projection = d3.geoMercator()
    .scale(90)
    .center([20,40])
    .translate([width / 2, height / 2]);

let colorScale = d3.scaleThreshold()
    .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .range(d3.schemeRdYlGn[9]);

// Load dados externos para o array
let promises = [d3.json(geoMap),
    d3.csv(demographics, function(d) { return{country: d.Country, code: d.id, year:+d.Year, rank: +d.HappinessRank, score: +d.HappinessScore, economy: +d.Economy, health: +d.Health, freedom: +d.Freedom, generosity: +d.Generosity, trust: +d.Trust}})];

Promise.all(promises).then(draw_map);

console.log(promises);

function draw_map(data) {
    // Desenha o mapa
    svg.append("g")
        .selectAll("path")
        .data(data[0]['features']) // mapa com as shapes
        .enter()
        .filter(function (d){
            // desenhar apenas os paises encontrados no ficheiro das geometrias
            return data[1].find(o => o.code === d['id']) != undefined;
        })
        .append("path")
        // desenha cada país consoante a projecção definida
        .attr("d", d3.geoPath().projection(projection))
        // define a cor consoante a população
        .attr("fill", function (d) {
            // ir buscar a linha correspondente ao país
            let line = data[1].find(o => o.code === d['id']);
            return colorScale(line['score']);
        });

   


}