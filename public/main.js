import Cidade from './cidade.js'
import Edge from './edge.js'
//import BFS from './bfs.js';

var myGraph = new Graph();

function Graph(){

    this.nNodes = 0;
    this.vertices = [];
    this.edges = [];
    this.adjList = new Map();
    
    this.addNode = function(Cidade){
        this.vertices.push(Cidade);
        this.adjList.set(Cidade.id, []);
    };
    
    this.addCity = function(name, descrip){
        var name1 = name;
        var descrip1 = descrip;

        var city = new Cidade(name1, descrip1, this.nNodes++);

        city.group = 0;

        this.addNode(city);
    };

    this.addEdge = function(from, to, direcional){
        this.adjList.get(from).push(to);
        this.adjList.get(to).push(from);
        var newEdge = new Edge(from, to);
        this.edges.push(newEdge);
    }

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
        this.fillCidadesSelect("origemBusca");
        this.fillCidadesSelect("destino");
        this.fillCidadesSelect("destinoBusca");
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
// var nodes = new vis.DataSet([
//     { id: 1, label: "Node 1" },
//     { id: 2, label: "Node 2" },
//     { id: 3, label: "Node 3" },
//     { id: 4, label: "Node 4" },
//     { id: 5, label: "Node 5" },
//   ]);

//   // create an array with edges
// var edges = new vis.DataSet([
// //{ from: 1, to: 3 },
// //{ from: 0, to: 1 },
// // { from: 2, to: 4 },
// // { from: 2, to: 5 },
// // { from: 3, to: 3 },
// ]);


$("#adicionar-estrada").on("click", function(){

    //recupera vertice selecionado e adiciona aresta
    var from = $("#origem").val();
    var to = $("#destino").val();
    var idFrom = myGraph.vertices.find(x => x.label === from);
    var idTo = myGraph.vertices.find(x => x.label === to);

    myGraph.addEdge(idFrom.id, idTo.id, true);

    //informa nós e arestas e exibe
    var nodes = new vis.DataSet(myGraph.vertices);
    var edges = new vis.DataSet(myGraph.edges);

    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };

  var options = {
    nodes: {
        shape: 'dot',
        size: 30,
        font: {
          size: 16,
          color: "black"
        },
        // color: {
        //   border: 'black',
        //   color: "#ffffff",
        // }
      },
      edges: {
        arrows: {
          to: false
        }
      }
  };
  var network = new vis.Network(container, data, options);
})


const bfsMenorCaminho = (graph, nodeA, nodeB) => {
    
    const queue = [];
    var visited = [];
    var vet = [];
    var vetCaminho = [];
    var caminho = 0;

    for (let i = 0; i < graph.nNodes; i++) {
        visited[i] = false;
        vet[i] = 0;
        vetCaminho[i] = -1;
    }
    
    visited[nodeA] = true;

    queue.push(nodeA);
    
    while (queue.length > 0) {

        let currentNode = queue.shift();
        
        console.log(`visiting ${currentNode}`);

        if(nodeB === currentNode){
            print(vetCaminho, nodeB);
            break;
        }

        for (let j = 0; j < myGraph.adjList.get(parseInt(currentNode)).length; j++) {
            if (visited[myGraph.adjList.get(parseInt(currentNode))[j]] === false) {
                visited[myGraph.adjList.get(parseInt(currentNode))[j]] = true;
                vet[j] = caminho;
                
                vetCaminho[myGraph.adjList.get(parseInt(currentNode))[j]] = currentNode;

                queue.push(myGraph.adjList.get(parseInt(currentNode))[j]);
            }
        }
        caminho++;
    }

    return vetCaminho[nodeB];
};

$("#buscar").on("click", function(){

    var from = $("#origemBusca").val();
    var to = $("#destinoBusca").val();
    var idFrom = myGraph.vertices.find(x => x.label === from);
    var idTo = myGraph.vertices.find(x => x.label === to);
    
    console.log(myGraph);
    console.log(myGraph.adjList.get(0));

    bfsMenorCaminho(myGraph, idFrom.id, idTo.id);
    
    
    console.log(myGraph.adjList.get(0)[1]);

    var nodes = new vis.DataSet(myGraph.vertices);
    var edges = new vis.DataSet(myGraph.edges);
    

    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };

  var options = {
    nodes: {
        shape: 'dot',
        size: 30,
        font: {
          size: 16,
          color: "black"
        },
        // color: {
        //   border: 'black',
        //   color: "#ffffff",
        // }
      },
      edges: {
        arrows: {
          to: false
        }
      }
  };
    var network = new vis.Network(container, data, options);
});

function print(predecessor, v){
    if (predecessor[v] >= 0){
        print(predecessor, predecessor[v]);
        myGraph.vertices.find(x => x.id = v).group = 1;
        console.log(predecessor[v]) 
    }
}

