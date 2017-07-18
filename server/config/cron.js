function cronStuff(cron) {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'development') {
        var dbFunctions = require('../functions/dataBaseUpdateFunction');
        cron.schedule('*/5 * * * *', dbFunctions.getAndUpdateLeagues);
        cron.schedule('*/5 * * * *', dbFunctions.pullTeamsFromLeagues);
        cron.schedule('*/1 * * * *', dbFunctions.getAndUpdateMatches);
        cron.schedule('*/2 * * * *', dbFunctions.getAndUpdatePlayers);
    }
}

module.exports = cronStuff;