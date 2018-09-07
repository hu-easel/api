"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { sequelize } from './database';
// import { User, ROLE_STUDENT } from './features/classes/model';
const log = require("loglevel");
log.setLevel(log.levels.TRACE);
log.info('Application is starting...');
// (async () => {
//   try {
//     await sequelize.authenticate();
//     log.info('Connection has been established successfully.');
//
//     await User.sync({ force: true });
//
//     await User.create({
//       firstName: 'Jerred',
//       lastName: 'Shepherd',
//       hNumber: 'H01599828',
//       password: '0',
//       role: ROLE_STUDENT
//     });
//
//     let users = await User.findAll();
//
//     log.info('Users: ', users);
//   } catch (err) {
//     log.error('Unable to connect to the database:', err);
//   }
// })();
log.info('Application stopping');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUEwQztBQUMxQyxpRUFBaUU7QUFDakUsZ0NBQWdDO0FBRWhDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUvQixHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFdkMsaUJBQWlCO0FBQ2pCLFVBQVU7QUFDVixzQ0FBc0M7QUFDdEMsaUVBQWlFO0FBQ2pFLEVBQUU7QUFDRix3Q0FBd0M7QUFDeEMsRUFBRTtBQUNGLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qix1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLFVBQVU7QUFDVixFQUFFO0FBQ0Ysd0NBQXdDO0FBQ3hDLEVBQUU7QUFDRixrQ0FBa0M7QUFDbEMsb0JBQW9CO0FBQ3BCLDREQUE0RDtBQUM1RCxNQUFNO0FBQ04sUUFBUTtBQUVSLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyJ9