export type EventsData = any;

export type EventsName = 'onCriticalChange';

export type EventsSubscriptions = {
    [Key: string]: EventsSubscriptionsCategory;
};

export type EventsSubscriptionsCategory = {
    [Key in EventsName]?: EventsSubscriptionsEvent;
};

export type EventsSubscriptionsEvent = { [Key: string]: EventsCallback };

export type EventsCallback = (data: EventsData) => void;

export type EventsUnsubsribe = {
    eventsCategory: string;
    eventsName: EventsName;
    eventId: string;
    unsubscribe: Function;
};
