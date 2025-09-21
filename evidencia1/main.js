const fs = require('fs');
const path = require('path');

function parseFile(filename) {
  const raw = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
  return raw.replace(/\r?\n/g, '');
}

// ======  Parte 1: Buscar substrings ====== //
function containsWithPos(haystack, needle) {
  if (needle.length === 0) return { found: true, pos1: 1 }; // por si acaso

  const idx = haystack.indexOf(needle);
  if (idx === -1) return { found: false, pos1: -1 };

  return { found: true, pos1: idx + 1 }; // posiciones 1-based
}

// ====== Parte 2: Palíndromo mas largo [Algoritmo de Manacher] ====== //
function calcPalindrome(s) {
  // En caso de que el array este vacio
  if (s.length === 0) return [1, 0];

  // Empieza el string en '^' para indicar el inicio del string.
  // Insertar '#' entre cada caracter del string para asegurarnos de que sean caracteres impares.
  const T = ['^'];
  for (const ch of s) T.push('#', ch);
  T.push('#', '$'); // Termina el string en '$' para indicar el fin del string.

  const n = T.length;
  const P = new Array(n).fill(0); // [0] * n

  // Centro y limite derecho del palindromo.
  let C = 0, R = 0;

  // Recorre el string
  for (let i = 1; i < n - 1; i++) {
    // El valor opuesto (mirror) que tiene el substring del lado opuesto en caso de haberlo.
    const mirr = 2 * C - i;

    if (i < R) P[i] = Math.min(R - i, P[mirr]);

    // Va comporando los substrings para saber si hay un match y aumentar la longiutd maxima del palindromo.
    while (T[i + 1 + P[i]] === T[i - 1 - P[i]]) P[i]++;

    if (i + P[i] > R) {
      C = i;
      R = i + P[i];
    }
  }

  // Encontrar el centro con mayor P[i]
  let maxLen = 0, center = 0;
  for (let i = 1; i < n - 1; i++) {
    if (P[i] > maxLen) {
      maxLen = P[i];
      center = i;
    }
  }
  // Convertir a índices en s (0-based)
  const start0 = Math.floor((center - maxLen) / 2);
  const end0 = start0 + maxLen - 1;
  // Devolver 1-based
  return [start0 + 1, end0 + 1];
}

// ====== Parte 3: Substring mas largo ====== //
function calcSubstring(s1, s2) {
  if (s1.length === 0 || s2.length === 0) return [1, 0];

  let best = 0;
  let end1 = -1;

  const m = s2.length;
  let prev = new Array(m + 1).fill(0);
  let curr = new Array(m + 1).fill(0);

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[j] = prev[j - 1] + 1;

        if (curr[j] > best) {
          best = curr[j];
          end1 = i - 1;
        }

      } else {
        curr[j] = 0;
      }
    }

    [prev, curr] = [curr, prev];
    curr.fill(0);
  }

  if (best === 0) return [1, 0]; 
  
  const start0 = end1 - best + 1;
  const end0 = end1;

  return [start0 + 1, end0 + 1];
}

// ====== MAIN ====== //
(function main() {
  // Parsear archivos.
  const t1 = parseFile('transmission1.txt');
  const t2 = parseFile('transmission2.txt');
  const m1 = parseFile('mcode1.txt');
  const m2 = parseFile('mcode2.txt');
  const m3 = parseFile('mcode3.txt');

  // Parte 1
  const results = [];
  for (const m of [m1, m2, m3]) {
    const r = containsWithPos(t1, m);
    results.push(r.found ? `true ${r.pos1}` : 'false');
  }

  for (const m of [m1, m2, m3]) {
    const r = containsWithPos(t2, m);
    results.push(r.found ? `true ${r.pos1}` : 'false');
  }

  // Parte 2
  const [p1s, p1e] = calcPalindrome(t1);
  const [p2s, p2e] = calcPalindrome(t2);

  // Parte 3
  const [lcss, lcse] = calcSubstring(t1, t2);

  // ======== lOG ======== // 
  // Parte 1
  for (const line of results) console.log(line);
  // Parte 2
  console.log(`${p1s} ${p1e}`);
  console.log(`${p2s} ${p2e}`);
  // Parte 3
  console.log(`${lcss} ${lcse}`);
})();