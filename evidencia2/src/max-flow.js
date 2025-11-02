// ==== FLUJO MÁXIMO (FORD-FULKERSON & BFS) ====

export function maxFlow(capacity) {
    const n = capacity.length;
    const residual = capacity.map(row => [...row]);
    let totalFlow = 0;
    
    function bfs(source, sink, parent) {
        const visited = Array(n).fill(false);
        const queue = [source];
        visited[source] = true;
        
        while (queue.length > 0) {
            const u = queue.shift();
            
            for (let v = 0; v < n; v++) {
                if (!visited[v] && residual[u][v] > 0) {
                    visited[v] = true;
                    parent[v] = u;
                    if (v === sink) return true;
                    queue.push(v);
                }
            }
        }
        return false;
    }
    
    const parent = Array(n).fill(-1);
    
    while (bfs(0, n - 1, parent)) {
        let pathFlow = Infinity;
        
        for (let v = n - 1; v !== 0; v = parent[v]) {
            const u = parent[v];
            pathFlow = Math.min(pathFlow, residual[u][v]);
        }
        
        for (let v = n - 1; v !== 0; v = parent[v]) {
            const u = parent[v];
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }
        
        totalFlow += pathFlow;
        parent.fill(-1);
    }
    
    return totalFlow;
}