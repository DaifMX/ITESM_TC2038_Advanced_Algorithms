import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { input } from './input.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filePath, file;

async function main() {
    const filename = await input('Ingrese nombre del archivo: ');
    const numberVal = await input('Ingrese un número multiplo de 4 entre 16 y 64:');

    const nInt = parseInt(numberVal);
    if (nInt % 4 !== 0 || nInt > 64 || nInt < 16) throw new Error('Número invalido.');

    filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        console.error('File does not exist in the current directory.');
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const chars = fileContent.split('');

    const padLen = nInt - (chars.length % nInt);
    if (padLen !== nInt) {
        for (let i = 0; i < padLen; i++) chars.push(String.fromCharCode(nInt));
    }

    const rows = Math.ceil(chars.length / nInt);
    const table = Array.from({ length: rows }, (_, r) =>
        chars.slice(r * nInt, (r + 1) * nInt)
    );

    const a = Array(nInt).fill(0);
    for (let col = 0; col < nInt; col++) {
        for (let row = 0; row < rows; row++) {
            if (table[row][col]) a[col] += table[row][col].charCodeAt(0);
        }
        a[col] = a[col] % 256;
    }

    let out = '';
    for (let i = 0; i < nInt / 4; i++) {
        out += a[i].toString(16).toUpperCase().padStart(2, '0');
    }
    console.log(out);
}

main();