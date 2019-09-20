function print(stmt, ...vars) { 
    console.log(stmt, ((vars.length > 0)? vars: ''));
}

function createCyclic(graph, isCyclic) { 
    if(isCyclic) { 
        graph.edges[0].src = 0; 
        graph.edges[0].dest = 1; 
        graph.edges[1].src = 1; 
        graph.edges[1].dest = 2; 
        graph.edges[2].src = 2; 
        graph.edges[2].dest = 0; 
    }
    else { 
        graph.edges[0].src = 0; 
        graph.edges[0].dest = 1; 
        graph.edges[1].src = 1; 
        graph.edges[1].dest = 2; 
        graph.edges[2].src = 2; 
        graph.edges[2].dest = 3; 
    }
}

class Graph { 
    constructor(v, e) { 
        this.v = v; 
        this.e = e;
        
        this.edges = [];  

        for(let i=0; i< e; i++) { 
            this.edges.push(() => {
                $this = Object(); 
                $this.src = null; 
                $this.dest = null 
                return $this; 
            }); 
        }
    }

    find (parent , i) {
        print(parent, i);
        
        let temp = i; 
        
        while (parent[i] > -1) { 
            i = parent[i]; 
        }

        // collapse find -- not tested yet. 
        if (temp > -1 && temp !== i) parent[temp] = i;

        return i; 
    }

    union(parent, i, j) {
        let firstSetHead = this.find(parent, i);
        let secondSetHead = this.find(parent, j);

        /* weighted union. */

        if (parent[firstSetHead] === -1 && parent[secondSetHead] === -1) {
            parent[firstSetHead] += -1; 
            parent[secondSetHead] = firstSetHead;
        }

        else if (parent[firstSetHead] <= parent[secondSetHead]) { 
            parent[firstSetHead] += parent[secondSetHead]; 
            parent[secondSetHead] = firstSetHead; 
        }

        else {        
            parent[secondSetHead] += parent[firstSetHead]; 
            parent[firstSetHead] = secondSetHead; 
        }
    }

    isCyclic() { 
        let parent = new Array(this.v); 
        
        for(let i=0; i<parent.length; i++) { 
            parent[i] = -1;
        }
        
        print(parent); 

        for(let i=0; i<this.e; i++) { 
            let x = this.find(parent, this.edges[i].src); 
            let y = this.find(parent, this.edges[i].dest);
            
            if (x === y) {
                print(parent);  
                return true; 
            }
        
            this.union(parent, x, y); 

        }
        print(parent); 
        return false; 
    }
}



let graph = new Graph(4, 3);

// // Non-Cyclic 
createCyclic(graph, false);

// // Cyclic 
// createCyclic(graph, true); 


if (graph.isCyclic()) console.log("Cyclic"); 
else console.log("Non-Cyclic"); 
