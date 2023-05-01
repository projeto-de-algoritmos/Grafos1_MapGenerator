class Cidade{
    constructor(nome, descri){
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



