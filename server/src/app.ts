import server from './core/startup/server';

// import { value Staff } from './database/models';

server.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}...`));
