// === DIAGRAMA DE VORONOI === \\

export function voronoiDiagram(centrals) {
    const n = centrals.length;
    
    // Encontrar límites del área
    const xs = centrals.map(p => p.x);
    const ys = centrals.map(p => p.y);
    const minX = Math.min(...xs) - 100;
    const maxX = Math.max(...xs) + 100;
    const minY = Math.min(...ys) - 100;
    const maxY = Math.max(...ys) + 100;
    
    // Crear polígonos aproximados para cada central
    const polygons = [];
    
    for (let i = 0; i < n; i++) {
        const polygon = [];
        const resolution = 16; // Puntos alrededor
        
        for (let angle = 0; angle < 360; angle += 360 / resolution) {
            const rad = (angle * Math.PI) / 180;
            let maxDist = Math.max(maxX - minX, maxY - minY);
            
            // Buscar el punto más lejano en esta dirección que pertenece a la región i
            for (let dist = 0; dist <= maxDist; dist += 10) {
                const x = centrals[i].x + dist * Math.cos(rad);
                const y = centrals[i].y + dist * Math.sin(rad);
                
                // Verificar si este punto está más cerca de la central i
                let closest = i;
                let minDist = pitagoras(centrals[i], { x, y });
                
                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        const d = pitagoras(centrals[j], { x, y });
                        if (d < minDist) {
                            closest = j;
                            minDist = d;
                            break;
                        }
                    }
                }
                
                if (closest !== i) {
                    polygon.push({ x, y });
                    break;
                }
            }
        }
        
        polygons.push(polygon);
    }
    
    return polygons;
}

function pitagoras(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}