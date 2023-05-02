import Graph from "./graph";


export default function BFS(G: Graph){

    var fila = new Queue();
}

function Queue(){
    this.fila = []
}

Queue.prototype.enqueue = function(e: number){
    this.fila.push(e);
}

Queue.prototype.denqueue = function(): number {
    return this.fila.shift();
}

Queue.prototype.length = function(): number {
    return this.fila.length;
}
