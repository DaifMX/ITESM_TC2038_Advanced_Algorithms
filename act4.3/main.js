const puntos = [
  { x: 37, y: 35 },
  { x: 35, y: 46 },
  { x: 11, y: 6 },
  { x: 7, y: 37 },
  { x: 43, y: 50 },
  { x: 25, y: 24 },
  { x: 42, y: 18 },
  { x: 10, y: 2 },
  { x: 42, y: 22 },
  { x: 35, y: 29 },
  { x: 44, y: 2 },
  { x: 11, y: 49 },
  { x: 5, y: 33 },
  { x: 40, y: 39 },
  { x: 37, y: 47 },
  { x: 13, y: 33 },
  { x: 47, y: 40 },
  { x: 20, y: 33 },
  { x: 7, y: 21 },
  { x: 25, y: 2 },
];

const pitagoras = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

let minDist = Infinity;
let puntoA = null;
let puntoB = null;

for (let i = 0; i < puntos.length; i++) {
  for (let j = i + 1; j < puntos.length; j++) {
    const d = pitagoras(puntos[i], puntos[j]);
    if (d < minDist) {
      minDist = d;
      puntoA = puntos[i];
      puntoB = puntos[j];
    }
  }
}

console.log(`Distancia mas corta: ${minDist.toFixed(2)}`);
console.log(`Puntos (${puntoA.x} ${puntoA.y}) y (${puntoB.x} ${puntoB.y})`);

function dibujarPuntos(puntos, a, b) {
  const ancho = 50;
  const alto = 50;

  // Crear plano
  const plano = Array.from({ length: alto }, () => Array(ancho).fill(" "));

  // Dibujar puntos
  for (const p of puntos) {
    if (p.x < ancho && p.y < alto) {
      plano[alto - p.y - 1][p.x] = ".";
    }
  }

  // Dibujar puntos encontrados
  plano[alto - a.y - 1][a.x] = "A";
  plano[alto - b.y - 1][b.x] = "B";

  // Logear mapa de puntos
  console.log(`======================== MAPA ========================`);
  for (const fila of plano) {
    console.log(fila.join(""));
  }
}

dibujarPuntos(puntos, puntoA, puntoB);
