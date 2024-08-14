require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,

    apiUrl: process.env.API_URL,
    SessionSecret: process.env.SESSION_SECRET,
    
    dburl: process.env.DATABASE_URL,

};
module.exports = {
    production: {
        url: config.dburl,
        dialect: 'mysql'
    },
    config:config
}

