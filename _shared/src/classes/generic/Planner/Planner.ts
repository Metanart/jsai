import { EventsData } from '@classes/generic/Events/EventsTypes';

import { PlannerGoal } from './PlannerGoal';

export class Planner {
    goals: PlannerGoal[] = [];

    addGoal(data: EventsData) {
        const newGoal = new PlannerGoal(data);
        this.goals.push(newGoal);
    }
}
