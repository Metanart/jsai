import { v4 } from 'uuid';

import { EventsName, EventsSubscriptions, EventsSubscriptionsCategory, EventsSubscriptionsEvent } from './EventsTypes';
import { EventsCallback, EventsData } from './EventsTypes';

export class Events {
    private subscriptions: EventsSubscriptions = {};

    private getCategory(eventCategory: string): EventsSubscriptionsCategory {
        if (this.subscriptions[eventCategory] === undefined) {
            this.subscriptions[eventCategory] = {};
        }

        return this.subscriptions[eventCategory] as EventsSubscriptionsCategory;
    }

    private getEvent(category: EventsSubscriptionsCategory, eventsName: EventsName): EventsSubscriptionsEvent {
        if (category[eventsName] === undefined) {
            category[eventsName] = {};
        }

        return category[eventsName] as EventsSubscriptionsEvent;
    }

    subscribe(eventsCategory: string, eventsName: EventsName, callback: EventsCallback) {
        const eventId: string = v4();
        const subscriptionsCategory = this.getCategory(eventsCategory);
        const subscriptionsEvent = this.getEvent(subscriptionsCategory, eventsName);

        subscriptionsEvent[eventId] = callback;

        return {
            eventsCategory,
            eventsName: eventsName,
            eventId: eventId,
            unsubscribe: () => {
                delete subscriptionsEvent[eventId];
                if (Object.keys(subscriptionsEvent).length === 0) delete subscriptionsCategory[eventsName];
                if (Object.keys(subscriptionsCategory).length === 0) delete this.subscriptions[eventsCategory];
            },
        };
    }

    trigger(eventsCategory: string, eventsName: EventsName, data: EventsData) {
        const subscriptionsEvent: EventsSubscriptionsEvent | undefined =
            this.subscriptions[eventsCategory]?.[eventsName];

        if (!subscriptionsEvent) return;

        Object.keys(subscriptionsEvent).forEach((key) => subscriptionsEvent[key](data));
    }
}
