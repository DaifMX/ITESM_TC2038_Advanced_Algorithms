// === PROBLEMA DEL VIAJERO (TSP) - PROGRAMACIÓN DINÁMICA ===

export function tsp(matrix) {
    const n = matrix.length;
    const VISITED_ALL = (1 << n) - 1;
    
    // dp[mask][i] = costo mínimo para visitar nodos en mask terminando en i
    const dp = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
    const parent = Array.from({ length: 1 << n }, () => Array(n).fill(-1));
    
    // Comenzar desde el nodo 0
    dp[1][0] = 0;
    
    // Programación dinámica
    for (let mask = 1; mask <= VISITED_ALL; mask++) {
        for (let u = 0; u < n; u++) {
            if (!(mask & (1 << u))) continue;
            if (dp[mask][u] === Infinity) continue;
            
            for (let v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                if (matrix[u][v] === 0) continue;
                
                const newMask = mask | (1 << v);
                const newCost = dp[mask][u] + matrix[u][v];
                
                if (newCost < dp[newMask][v]) {
                    dp[newMask][v] = newCost;
                    parent[newMask][v] = u;
                }
            }
        }
    }
    
    // Encontrar el mejor nodo final y cerrar el ciclo
    let minCost = Infinity;
    let lastNode = -1;
    
    for (let i = 0; i < n; i++) {
        if (matrix[i][0] > 0) {
            const cost = dp[VISITED_ALL][i] + matrix[i][0];
            if (cost < minCost) {
                minCost = cost;
                lastNode = i;
            }
        }
    }
    
    // Reconstruir ruta
    const path = [];
    let mask = VISITED_ALL;
    let current = lastNode;
    
    while (current !== -1) {
        path.push(current);
        const prev = parent[mask][current];
        if (prev !== -1) {
            mask ^= (1 << current);
        }
        current = prev;
    }
    
    path.reverse();
    path.push(0); // Regresar al inicio
    
    return path;
}