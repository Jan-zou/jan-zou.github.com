---
title: Graph
---

### Definitions    

+ Vertex(node): "key";also have additional information——"payload"
+ Edge(arc): if the edges in a graph are all one-way, it's a directed graph
+ Weight
+ Path
+ Cycle: a path that starts and ends at the same vertex; a graph with no cycles is called an **acyclic graph**


### Two Implementations of a Graph
#### adjacency matrix
Use a two-dimensional matrix.    
Advantage: Simple; easy to see which nodes are connected to other nodes for small graph    
Disadvantage: not efficient to store "sparse" data in matrix    
![adjMat](/assets/blog/20140828_adjMat.png)    

#### adjacency list
A more space-efficient way to implement a sparsely connected graph is to use an adjacency list.    
Advantage: compactly represent a sparse graph; easily find all the links that are directly connected to a particular vertex    
![adjMat](/assets/blog/20140828_adjlist.png)    


### The Graph ADT
+ `Graph()` creates a new, empty graph.
+ `addVertex(vert)` adds an instance of `Vertex` to the graph.
+ `addEdge(fromVert, toVert)` Adds a new, directed edge to the graph that connects two vertices.
+ `addEdge(fromVert, toVert, weight)` Adds a new, weighted, directed edge to the graph that connects two vertices.
+ `getVertex(vertKey)` finds the vertex in the graph named `vertKey`.
+ `getVertices()` returns the list of all vertices in the graph.
+ `in` returns `True` for a statement of the form `vertex in graph`, if the given vertex is in the graph, `False` otherwise.

#### Implement
    # Use dictionary, implement with adjacency list
    class































