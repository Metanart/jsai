export class Timer {
    start = 0;
    end = 0;
    interval = 0;

    run() {
        this.start = Date.now();
    }

    finish() {
        this.end = Date.now();
        this.calculate();

        return this;
    }

    calculate() {
        this.interval = this.end - this.start;
    }
}
