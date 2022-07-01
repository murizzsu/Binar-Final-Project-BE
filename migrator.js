const { exec } = require("child_process");

module.exports = async () => {
    return new Promise((resolve) => {
        exec("npm run migrate", {env: process.env}, () => {
            // console.log(err)
            exec("npm run seed", {env: process.env}, () => {
                // console.log(err)
                resolve();
            });
        });
    });
};