const m = [
  [0, 3, -2, 4, 7, 1, -3, 2, 6, 9, 4, -5, 7, 8, 3, 1, 5, 6, -4, 2],
  [3, 0, 5, 2, -1, 4, 7, 2, 1, 6, -3, 2, 8, 4, 1, 5, 7, -2, 6, 3],
  [-2, 5, 0, 3, 4, -1, 2, 7, 3, 1, 2, 4, -3, 6, 5, 8, 2, 4, 7, 1],
  [4, 2, 3, 0, 5, 6, 7, -2, 8, 1, 4, 3, 2, 9, 1, 4, 5, 6, 2, 7],
  [7, -1, 4, 5, 0, 2, 3, 8, 9, 4, 7, 1, 5, 6, 8, 3, 1, 5, 2, 6],
  [1, 4, -1, 6, 2, 0, 5, 3, 1, 8, 2, 7, 6, -2, 4, 5, 7, 2, 3, 8],
  [-3, 7, 2, 7, 3, 5, 0, 4, 2, 6, 1, 8, 2, 7, 9, 4, 1, 5, 2, 7],
  [2, 2, 7, -2, 8, 3, 4, 0, 5, 1, 2, 7, 9, 6, 2, 5, 7, 8, 2, 3],
  [6, 1, 3, 8, 9, 1, 2, 5, 0, 2, 4, 7, 8, 1, 6, 3, 5, 7, 2, 9],
  [9, 6, 1, 1, 4, 8, 6, 1, 2, 0, 7, 2, 5, 8, 3, 7, 9, 4, 1, 2],
  [4, -3, 2, 4, 7, 2, 1, 2, 4, 7, 0, 6, 8, 2, 3, 9, 4, 5, 1, 7],
  [-5, 2, 4, 3, 1, 7, 8, 7, 7, 2, 6, 0, 3, 1, 6, 7, 2, 5, 4, 8],
  [7, 8, -3, 2, 5, 6, 2, 9, 8, 5, 8, 3, 0, 6, 7, 5, 8, 2, 3, 7],
  [8, 4, 6, 9, 6, -2, 7, 6, 1, 8, 2, 1, 6, 0, 9, 4, 5, 7, 2, 3],
  [3, 1, 5, 1, 8, 4, 9, 2, 6, 3, 3, 6, 7, 9, 0, 3, 6, 7, 8, 4],
  [1, 5, 8, 4, 3, 5, 4, 5, 3, 7, 9, 7, 5, 4, 3, 0, 2, 1, 7, 6],
  [5, 7, 2, 5, 1, 7, 1, 7, 5, 9, 4, 2, 8, 5, 6, 2, 0, 4, 7, 3],
  [6, -2, 4, 6, 5, 2, 5, 8, 7, 4, 5, 5, 2, 7, 7, 1, 4, 0, 5, 2],
  [-4, 6, 7, 2, 2, 3, 2, 2, 2, 1, 1, 4, 3, 2, 8, 7, 7, 5, 0, 4],
  [2, 3, 1, 7, 6, 8, 7, 3, 9, 2, 7, 8, 7, 3, 4, 6, 3, 2, 4, 0]
];

function floyd(matriz) {
  const n = matriz.length;
  const dist = matriz.map(fila => [...fila]);
  let ops = 0;

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        ops++;
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return { dist, ops };
};

function dijkstra(matriz, origen) {
  const n = matriz.length;
  const dist = new Array(n).fill(Infinity);
  const visitados = new Array(n).fill(false);
  let ops = 0;

  dist[origen] = 0;

  for (let i = 0; i < n; i++) {
    let minDist = Infinity;
    let u = -1;
    for (let j = 0; j < n; j++) {
      ops++
      if (!visitados[j] && dist[j] < minDist) {
        minDist = dist[j];
        u = j;
      }
    }

    if (u === -1) break;
    visitados[u] = true;

    for (let v = 0; v < n; v++) {
      ops++;
      if (!visitados[v] && dist[u] + matriz[u][v] < dist[v]) {
        dist[v] = dist[u] + matriz[u][v];
      }
    }
  }

  return { dist, ops };
};

// === Resultados === \\
console.log("=== FLOYD ===");
const resFloyd = floyd(m);
console.log("\nMatriz D(N) - Distancias mínimas entre todos los pares:");
resFloyd.dist.forEach((fila, i) => console.log(`Fila ${i + 1}:`, fila.map(v => v.toString().padStart(4)).join(' ')));
console.log(`\nFloyd realizó ${resFloyd.ops} operaciones`);


console.log("\n=== DIJKSTRA (desde última fila) ===");
const n = m.length;
const resDijkstra = dijkstra(m, n - 1);
console.log("\nDistancias desde nodo", n, ":");
console.log(resDijkstra.dist.map(v => v.toString().padStart(4)).join(' '));
console.log(`\nDijkstra realizó ${resDijkstra.ops} operaciones`);


console.log("\n=== COMPARACIÓN ===");
const filaFloyd = resFloyd.dist[n - 1];
const filaDijkstra = resDijkstra.dist;
let coinciden = true;

for (let i = 0; i < n; i++) {
  if (filaFloyd[i] !== filaDijkstra[i]) {
    coinciden = false;
    console.log(`Diferencia en posición ${i}: Floyd=${filaFloyd[i]}, Dijkstra=${filaDijkstra[i]}`);
  }
}

if (coinciden) console.log("✓ Los resultados coinciden perfectamente");

console.log(`\nFloyd realizó ${resFloyd.ops} operaciones`);
console.log(`Dijkstra realizó ${resDijkstra.ops} operaciones`);
console.log(`Dijkstra fue ${(resFloyd.ops / resDijkstra.ops).toFixed(2)}x más eficiente`);