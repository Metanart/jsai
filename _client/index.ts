import 'reflect-metadata';

import { Property } from '@classes/Property/Property';
import { serverGetAll } from '@utils/server-request';

serverGetAll('properties').then((data) => console.log(data));
