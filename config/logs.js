const logger = require("pino")({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
        }
    }
})

const infoLog = (msg) => {
    logger.info(`[Tiger's Server Info]: ${msg}`)
}

const warnLog = (msg) => {
    logger.warn("[Tiger's Server Warn]: %s", msg)
}

const errLog = (msg) => {
    logger.error("[Tiger's Server Error]: %s", msg)
}

const fatalLog = (msg) => {
    logger.error("[Tiger's Server Fatal]: %s", msg)
}

module.exports = {
    infoLog,
    warnLog,
    errLog,
    fatalLog
}