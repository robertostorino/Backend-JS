import parseArg from 'minimist';

const config = {
    alias: {
        p: 'port'
    },
    default: {
        port: 8080
    }
};

const { port } = parseArg(process.argv.slice(2), config);


export { port };