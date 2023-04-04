import parseArg from 'minimist';

const config = {
    alias: {
        p: 'port',
        m: 'mode',
        db: 'persistance'
    },
    default: {
        port: 8080,
        mode: 'FORK',
        persistance: 'MONGO'
    }
};

const { port, mode, persistance } = parseArg(process.argv.slice(2), config);


export { 
    port, 
    mode,
    persistance
};