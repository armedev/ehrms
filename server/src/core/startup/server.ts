import '../config/env';
import express from 'express';
import routes from './routes';
import error from '../middleware/error';
import './logger';
import loaders from './loaders';

// import { value Staff } from '../../database/models';
import { Staff } from '../../database/models';

const fun = async () => {
  const staff = await Staff.create({
    firstname: 'admin',
    phone: '07035120699',
    lastname: 'admin',
    middlename: 'admin',
    username: 'admin',
    gender: 'Male',
    address: 'no address',
    photo: 'IMG_20202022.jpg',
    password: '123456',
    email: 'admin@admin.com',
    department: 'Medical',
    role: 'Doctor',
    sub_role: 'GP',
    date_of_birth: '2000-09-02',
  });

  console.log(staff);
};

// fun();

const server: express.Application = express();
loaders(server, express);
routes(server);

server.use(error);

export default server;
