import readline from 'readline';

export const input = (str) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question(str, (inpt) => {
            rl.close();
            resolve(inpt);
        });
    });
};