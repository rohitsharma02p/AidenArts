const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const rbac = require("./utils/mongoose-rbac.js");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(async() => {

    await rbac.Role.deleteMany({});
    await rbac.Permission.deleteMany({});
    
     rbac.init(
       {
         admin: [
           ["createRole", "RolePermissions"],
           ["readRole", "RolePermissions"],
           ["updateRole", "RolePermissions"],
           ["deleteRole", "RolePermissions"],
           ["allRole", "RolePermissions"],
           ["readRolePermission", "RolePermissions"]
         ],
         user: [["readRole", "RolePermissions"],
         ["myRole", "RolePermissions"]]
       },
       function (err, admin, user) {
         // console.log(err);
         // console.log(admin);
         /*
         { __v: 1,
           name: 'admin',
           _id: 513c14dbc90000d10100004e,
           permissions: [ 513c14dbc90000d101000044,
             513c14dbc90000d101000045,
             513c14dbc90000d101000046,
             513c14dbc90000d101000047 ] }
       */
         // console.log(user);
         /*
         { __v: 1,
           name: 'readonly',
           _id: 513c14dbc90000d10100004f,
           permissions: [ 513c14dbc90000d101000045 ] }
       */
       }
     );

     logger.info("data seed addeded");
   


  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

const {eventService} =  require("./services")
eventService.fetchEvents();
eventService.fetchTimestampEvents();





















