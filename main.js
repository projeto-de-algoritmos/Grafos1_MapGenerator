class Cidade{
    constructor(nome, descri){
    this.nome = nome;
    this.descri = descri;
    }
}

function Graph(){
    var vertices = [];
    var adjList = new Map();

    this.addNode = function(Cidade){
        vertices.push(Cidade);
        adjList.set(Cidade.nome, []);
    };
    
    this.addCity = function(name, descrip){
        var name1 = name;
        var descrip1 = descrip;

        var city = new Cidade(name1, descrip1);

        this.addNode(city);
    };


}

const btn = document.querySelector('#submitbtn')

btn.addEventListener('click', function(event){
    event.preventDefault();

    const name = document.querySelector('#nome').value
    const descri = document.querySelector('#description').value

    myGraph.addCity(name, descri);
})

var myGraph = new Graph();

