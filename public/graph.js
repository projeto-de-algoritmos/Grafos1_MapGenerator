export default function Graph(){

    this.nNodes = 0;
    this.vertices = [];
    this.edges = [];
    this.adjList = new Map();
    
    this.addNode = function(Cidade){
        this.vertices.push(Cidade);
        this.adjList.set(Cidade.nome, []);
    };
    
    this.addCity = function(name, descrip){
        var name1 = name;
        var descrip1 = descrip;

        var city = new Cidade(name1, descrip1, this.nNodes++);
        city.group = this.nNodes%2;
        this.addNode(city);
    };

    this.addEdge = function(from, to, direcional){
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
        this.fillCidadesSelect("destino");
    };
}


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
