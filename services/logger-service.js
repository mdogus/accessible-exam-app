const winston = require('winston');
require('winston-mongodb');

dateFormat = () => {
    //tarih ve saat ifadesi
    var currentDate = new Date();
    switch (currentDate.getMonth()) {
        case 0:
            month = "Oca";
            break;
        case 1:
            month = "Şub";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Nis";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Haz";
            break;
        case 6:
            month = "Tem";
            break;
        case 7:
            month = "Ağu";
            break;
        case 8:
            month = "Eyl";
            break;
        case 9:
            month = "Eki";
            break;
        case 10:
            month = "Kas";
            break;
        case 11:
            month = "Ara";
            break;
    }
    switch (currentDate.getDay()) {
        case 0:
            day = "Paz";
            break;
        case 1:
            day = "Pzt";
            break;
        case 2:
            day = "Sal";
            break;
        case 3:
            day = "Çar";
            break;
        case 4:
            day = "Per";
            break;
        case 5:
            day = "Cum";
            break;
        case 6:
            day = "Cmt";
            break;
    }

    return "[" + day + ", " + currentDate.getDate() + "-" + month + "-" + currentDate.getFullYear() + ", " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "]";
}

class LoggerService {
    constructor(route) {
        this.log_data = null
        this.route = route
        
        const category = "UserInteraction";
        
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                /*new winston.transports.File({
                    filename: `./logs/${route}.txt`
                }),*/
                new winston.transports.MongoDB({
                    db: "mongodb+srv://user_admin:mKWwIjvbpPU2q8VV@clustereso.qxzto.mongodb.net/eso?retryWrites=true&w=majority",
                    options: { useUnifiedTopology: true },
                    format: winston.format.combine(
                        winston.format.splat(),
                        winston.format.simple()
                        /*winston.format.label({
                            label: category
                        }),
                        winston.format.timestamp(),
                        winston.format.printf((info) => {
                            return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
                        })*/
                    )
                })
            ],
            /*format: winston.format.combine(
                winston.format.splat(),
                winston.format.simple()
            ),*/
            format: winston.format.printf((info) => {
                //var infoObject = JSON.stringify(info.obj);
                //var infoValue = Object.keys(infoObject).map(function (key) { return infoObject[key]; });
                //let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
                let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} |`
                //message = info.obj ? message + `${info.obj} | ` : message
                //message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                //message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                return message
            })
        });
        //this.logger.add(new winston.transports.MongoDB());
        
        this.logger = logger;
    }
    

  setLogData(log_data) {
    this.log_data = log_data
  }

  async info(message) {
    this.logger.log('info', message);
  }

  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    })
  }

  async debug(message) {
    this.logger.log('debug', message);
  }

  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    })
  }

  async error(message) {
    this.logger.log('error', message);
  }

  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    })
  }
}
module.exports = LoggerService
