export class Counter {
    step = 0;
    max = 0;
    isMaximumReached = false;

    constructor(max: number, currentStep = 0) {
        this.max = max;
        this.step = currentStep;

        this.updateStatuses();
    }

    increase() {
        this.step++;
        this.updateStatuses();
    }

    updateStatuses() {
        this.isMaximumReached = this.step >= this.max;
    }
}
