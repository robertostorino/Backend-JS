function sysInfo () {
    return{
    args: process.argv.slice(2),
    os: process.platform,
    nodeV: process.version,
    memoryReserved: process.memoryUsage.rss(),
    pathDeEjecucion: process.execPath,
    pid: process.pid,
    folder: process.cwd(),
    processors: os.cpu().length
    }
};

//rss: Resident Set Size (RSS)

export { sysInfo }