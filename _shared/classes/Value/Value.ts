import { calcPercentageNumberOfNumber } from '@utils/calc-percentage-number-of-number';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ValueNumber = [number, number?, number?];

const GLOBAL_MAX_VALUE = 10000;
const GLOBAL_MIN_VALUE = 0;
const GLOBAL_MAX_DEFAULT = 100;

@Entity()
export class Value {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'integer' })
    baseValue: number = 0;

    @Column({ type: 'integer' })
    baseMaxValue: number = 0;

    @Column({ type: 'integer' })
    baseMinValue: number = 0;

    @Column({ type: 'integer' })
    currentValue: number = 0;

    @Column({ type: 'integer' })
    currentMaxValue: number = 0;

    @Column({ type: 'integer' })
    currentMinValue: number = 0;

    shortage: number = 0;

    valuePercentage: number = 0;

    shortagePercentage: number = 0;

    constructor(current: number | ValueNumber = 0, base?: ValueNumber, id?: number) {
        if (id) this.id = id;

        if (typeof current === 'object' && typeof base === 'object') {
            this.setValue(current, base);
            return;
        }

        if (typeof current === 'object') {
            this.calculateValue(...current);
            return;
        }

        this.calculateValue(current);
    }

    setValue(current: ValueNumber, base: ValueNumber) {
        const [baseValue, baseMaxValue, baseMinValue] = base;
        const [currentValue, currentMaxValue, currentMinValue] = current;

        this.baseValue = baseValue;
        this.baseMaxValue = baseMaxValue || baseValue;
        this.baseMinValue = baseMinValue || 0;

        this.currentValue = currentValue;
        this.currentMaxValue = currentMaxValue || currentValue;
        this.currentMinValue = currentMinValue || 0;

        this.recalculate();
    }

    calculateValue(value: number, maxValue?: number, minValue?: number) {
        const initValue = value;
        const initMaxValue = maxValue || value;
        const initMinValue = minValue || 0;

        this.baseMinValue = this.getPreparedMinValue(initValue, initMaxValue, initMinValue);
        this.baseMaxValue = this.getPreparedMaxValue(initValue, initMaxValue, this.baseMinValue);
        this.baseValue = this.getPreparedValue(initValue, this.baseMaxValue, this.baseMinValue);

        this.reset();
    }

    resetCurrentValue() {
        this.currentValue = this.baseValue.valueOf();
        this.currentMinValue = this.baseMinValue.valueOf();
        this.currentMaxValue = this.baseMaxValue.valueOf();
    }

    reset() {
        this.resetCurrentValue();
        this.recalculate();
    }

    recalculateShortage() {
        this.shortage = this.currentMaxValue - this.currentValue;
    }

    recalculatePercentage() {
        this.valuePercentage = calcPercentageNumberOfNumber(this.currentValue, this.currentMaxValue);
        this.shortagePercentage = 100 - this.valuePercentage;
    }

    recalculate() {
        this.recalculateShortage();
        this.recalculatePercentage();
    }

    change(value: number) {
        this.currentValue = this.getPreparedValue(
            this.currentValue + value,
            this.currentMaxValue,
            this.currentMinValue,
        );
        this.recalculate();
    }

    getPreparedValue(value: number, maxValue: number, minValue: number) {
        if (value > maxValue) return maxValue;
        if (value < minValue) return minValue;

        return value;
    }

    getPreparedMaxValue(value: number, maxValue: number, minValue: number) {
        if (maxValue > GLOBAL_MAX_VALUE) return GLOBAL_MAX_VALUE;
        if (maxValue <= GLOBAL_MIN_VALUE) {
            if (maxValue < value) return value;
            if (maxValue < minValue) return minValue;
            return GLOBAL_MAX_DEFAULT;
        }
        return maxValue;
    }

    getPreparedMinValue(value: number, maxValue: number, minValue: number) {
        if (minValue < GLOBAL_MIN_VALUE) return GLOBAL_MIN_VALUE;
        if (minValue > value) return GLOBAL_MIN_VALUE;
        if (minValue > maxValue) return GLOBAL_MIN_VALUE;
        return minValue;
    }
}
