import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';

import TSCache from './TSCache';

const rl = readline.createInterface({ input, output });

const cache = new TSCache()

rl.on('line', input => {
    const [command, ...args] = input.split(/\s/)
    if (command === 'END') {
        rl.close();
    } else if (command === 'GET') {
        console.log(cache.get(args[0]))
    } else if (command === 'SET') {
        cache.set(args[0], args[1])
    } else if (command === 'UNSET') {
        cache.unset(args[0])
    } else if (command === 'NUMEQUALTO') {
        console.log(cache.numequalto(args[0]))
    } else if (command === 'BEGIN') {
        cache.begin()
    } else if (command === 'COMMIT') {
        cache.commit()
    } else if (command === 'ROLLBACK') {
        cache.rollback()
    } else {
        console.error('Unknown command', { command })
    }
})
