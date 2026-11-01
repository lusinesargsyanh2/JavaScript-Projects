class Graph {
    constructor(isDirected = false) {
        this.size = 0;
        this.directed = isDirected;
        this.matrix = [];
        this.vertices = [];
    }

    addVertex(vertex) {
        this.vertices.push(vertex);

        for (const row of this.matrix) {
            row.push(0);
        }

        this.size++;

        this.matrix.push(new Array(this.size).fill(0));
    }

    addEdge(u, v) {
        this.matrix[u][v] = 1;

        if (!this.directed) {
            this.matrix[v][u] = 1;
        }
    }

    print() {
        console.log("Vertices:", this.vertices);
        console.log("Adjacency Matrix:");

        this.matrix.forEach(row => console.log(row));
    }

    bfs(start) {
        const queue = [start];
        const visited = new Array(this.size).fill(false);
        visited[start] = true;
        const result = [];

        while (queue.length > 0) {
            const current = queue.shift();

            result.push(this.vertices[current]);

            for (let i = 0; i < this.size; i++) {
                if (this.matrix[current][i] === 1 && !visited[i]) {
                    queue.push(i);
                    visited[i] = true;
                }

            }
        }

        return result;

    }
}

const graph = new Graph();
graph.addVertex({ id: 1, name: "Anna" });
graph.addVertex({ id: 2, name: "John" });
graph.addVertex({ id: 3, name: "Mike" });

graph.addEdge(0, 1);
graph.addEdge(1, 2);

graph.print()

console.log(graph.bfs(1));
