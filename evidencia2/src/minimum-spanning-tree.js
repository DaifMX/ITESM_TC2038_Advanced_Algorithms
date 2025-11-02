import { UnionFind } from "./UnionFind.js";

// === ÁRBOL DE EXPANSIÓN MÍNIMA (KRUSKAL) === \\

export function minimumSpanningTree(matrix) {
    const n = matrix.length;
    const edges = [];

    // Crear lista de aristas
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (matrix[i][j] > 0) {
                edges.push({ from: i, to: j, weight: matrix[i][j] });
            }
        }
    }

    // Ordenar por peso
    edges.sort((a, b) => a.weight - b.weight);

    const uf = new UnionFind(n);
    const mst = [];

    for (const edge of edges) {
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
            if (mst.length === n - 1) break;
        }
    }

    return mst;
}