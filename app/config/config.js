module.exports = {
    "development": {
        "username": "root",
        "password": "",
        "database": "clfow_dev",
        "host"    : "127.0.0.1",
        "dialect" : "mysql"
    },
    "test"       : {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host"    : process.env.DB_HOST,
        "dialect" : "mysql"
    },
    "production" : {
        "username": "root",
        "password": "",
        "database": "clfow_prod",
        "host"    : "127.0.0.1",
        "dialect" : "mysql"
    }
}
