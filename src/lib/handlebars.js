const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    //  esto convierte el timestamp en: cuanto paso desde la creacion
    return format(timestamp);
};

module.exports = helpers;