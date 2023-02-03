function sysInfo () {
    return{
    args: process.argv.slice(2),
    os: process.platform,
    nodeV: process.version,
    memoryReserved: process.memoryUsage.rss(),
    pathDeEjecucion: process.execPath.split('/').pop(),
    pid: process.pid,
    folder: process.cwd()
    }
};

//rss: Resident Set Size (RSS)

export { sysInfo }