// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});

var counter = 0;

class Cidade{
    constructor(nome, descri){
    this.id = counter++;
    this.label = nome;
    this.nome = nome;
    this.descri = descri;
    }
}

var myGraph = new Graph();


function Graph(){
    this.vertices = [];
    this.adjList = new Map();

    this.addNode = function(Cidade){
        this.vertices.push(Cidade);
        this.adjList.set(Cidade.nome, []);
    };
    
    this.addCity = function(name, descrip){
        var name1 = name;
        var descrip1 = descrip;

        var city = new Cidade(name1, descrip1);

        this.addNode(city);
    };

    this.updateCityList = function() {
        var table = document.getElementById("city-list");
        table.innerHTML = "";
        for (var i = 0; i < this.vertices.length; i++) {
            var row = table.insertRow();
            var city = this.vertices[i];
            row.insertCell().innerHTML = city.nome;
            row.insertCell().innerHTML = city.descri;
        }
        this.fillCidadesSelect("origem");
        this.fillCidadesSelect("destino");
    };



}


const btn = document.querySelector('#submitbtn')

btn.addEventListener('click', function(event){
    event.preventDefault();

    const name = document.querySelector('#nome').value
    const descri = document.querySelector('#description').value

    myGraph.addCity(name, descri);
    myGraph.updateCityList();
})

Graph.prototype.fillCidadesSelect = function(selectId){
    var select = document.getElementById(selectId);
    select.innerHTML = "";

    for (var i = 0; i < this.vertices.length; i++) {
        var city = this.vertices[i];
        var option = document.createElement("option");
        option.text = city.nome;
        select.add(option);
    }

};


// create an array with nodes
var nodes = new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    //{ from: 1, to: 3 },
    { from: 0, to: 1 },
    // { from: 2, to: 4 },
    // { from: 2, to: 5 },
    // { from: 3, to: 3 },
  ]);

  // create a network
//   var container = document.getElementById("mynetwork");
//   var data = {
//     nodes: nodes,
//     edges: edges,
//   };
//   var options = {};
//   var network = new vis.Network(container, data, options);



$("#adicionar-estrada").on("click", function(){
    console.log(myGraph.vertices);
    nodes = new vis.DataSet(myGraph.vertices);
    var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  var network = new vis.Network(container, data, options);
})