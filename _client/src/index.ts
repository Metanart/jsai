import { Property } from '@shared/classes/common/Property/Property';
import { createPropertyFromEntity } from '@shared/classes/common/Property/PropertyUtils';
import { Events } from '@shared/classes/generic/Events/Events';

import { sendRequest } from './utils/send-request';

const events = new Events();
let property: Property;

events.subscribe('Property', 'onCriticalChange', (data) => {
    console.log(data);
});

sendRequest.getOne('properties', { id: 'a2d5ae04-a6e9-40ac-8d8f-d363fcacc66b' }).then((data) => {
    property = createPropertyFromEntity(data, events);
});
