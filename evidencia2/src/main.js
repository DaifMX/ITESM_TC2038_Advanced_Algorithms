import { tsp } from "./tsp-dp.js";
import { maxFlow } from "./max-flow.js";
import { minimumSpanningTree } from './minimum-spanning-tree.js';
import { voronoiDiagram } from './voronoi-diagram.js';

function solve(input) {
    const lines = input.trim().split('\n').filter(line => line.trim());
    let idx = 0;

    // Obtener N
    const n = parseInt(lines[idx++]);

    // Obtener matriz de adyacencias (distancias)
    const distMatrix = [];
    for (let i = 0; i < n; i++) {
        const row = lines[idx++].trim().split(/\s+/).map(Number);
        distMatrix.push(row);
    }

    // Obtener matriz de adyacencias (Cap de datos)
    const capMatrix = [];
    for (let i = 0; i < n; i++) {
        const row = lines[idx++].trim().split(/\s+/).map(Number);
        capMatrix.push(row);
    }

    // Leer centrales
    const centrals = [];
    for (let i = 0; i < n; i++) {
        const match = lines[idx++].match(/\((\d+),(\d+)\)/);
        centrals.push({ x: parseInt(match[1]), y: parseInt(match[2]) });
    }

    // ============================================
    // RESOLVER PROBLEMAS
    // ============================================

    console.log("\n" + "=".repeat(50));
    console.log(`${"=".repeat(12)} Actividad Integradora #2 ${"=".repeat(12)}`);
    console.log("=".repeat(50));

    // 1. Árbol de Expansión Mínima
    console.log("\n1. Path de cableado optimizado:");
    const mst = minimumSpanningTree(distMatrix);
    for (const edge of mst) {
        const from = String.fromCharCode(65 + edge.from);
        const to = String.fromCharCode(65 + edge.to);
        console.log(`(${from},${to})`);
    }

    // 2. TSP
    console.log("\n2. Ruta más eficiente:");
    const route = tsp(distMatrix);
    const routeStr = route.map(i => String.fromCharCode(65 + i)).join(' -> ');
    console.log(routeStr);

    // 3. Flujo Máximo
    console.log("\n3. Flujo máximo de información:");
    const maxFlowValue = maxFlow(capMatrix);
    console.log(maxFlowValue);

    // 4. Diagrama de Voronoi
    console.log("\n4. Polígonos de Voronoi (regiones de centrales):");
    const polygons = voronoiDiagram(centrals);
    for (let i = 0; i < polygons.length; i++) {
        console.log(`Central ${String.fromCharCode(65 + i)}:`);
        console.log(polygons[i].map(p => `(${p.x.toFixed(1)},${p.y.toFixed(1)})`).join(', '));
    }
}


const input = `4

 0 16 45 32
16  0 18 21
45 18  0  7
32 21  7  0

 0 48  12  18
52  0 42 32
18 46  0 56
24 36 52  0

(200,500)
(300,100)
(450,150)
(520,480)`;

solve(input);