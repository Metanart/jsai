import { calcPercentageNumberOfNumber } from '@shared/utils/calc-percentage-number-of-number';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

import { ValueEntity } from './ValueEntity';

export type ValueNumber = number | [number, number?, number?];

const GLOBAL_MAX_VALUE = 10000;
const GLOBAL_MIN_VALUE = 0;
const GLOBAL_MAX_DEFAULT = 100;

export abstract class Value {
    id: string = v4();
    shortage: number = 0;
    valuePercentage: number = 0;
    shortagePercentage: number = 0;

    private currentValue: number = 0;
    private currentMaxValue: number = 0;
    private currentMinValue: number = 0;
    private baseValue: number = 0;
    private baseMaxValue: number = 0;
    private baseMinValue: number = 0;

    constructor(value: ValueNumber = 0) {
        if (typeof value === 'object') {
            this.calculateValue(...value);
        } else {
            this.calculateValue(value);
        }
    }

    reset() {
        this.resetCurrentValue();
        this.recalculate();
    }

    change(value: number) {
        this.currentValue = this.getPreparedValue(
            this.currentValue + value,
            this.currentMaxValue,
            this.currentMinValue,
        );
        this.recalculate();
    }

    recalculate() {
        this.recalculateShortage();
        this.recalculatePercentage();
    }

    applyEntityData(entity: ValueEntity) {
        Object.assign(this, entity);
        this.recalculate();
        return this;
    }

    getEntityData() {
        return {
            id: this.id,
            currentValue: this.currentValue,
            currentMaxValue: this.currentMaxValue,
            currentMinValue: this.currentMinValue,
            baseValue: this.baseValue,
            baseMaxValue: this.baseMaxValue,
            baseMinValue: this.baseMinValue,
        } as ValueEntity;
    }

    private calculateValue(value: number, maxValue?: number, minValue?: number) {
        const initValue = value;
        const initMaxValue = maxValue || value;
        const initMinValue = minValue || 0;

        this.baseMinValue = this.getPreparedMinValue(initValue, initMaxValue, initMinValue);
        this.baseMaxValue = this.getPreparedMaxValue(initValue, initMaxValue, this.baseMinValue);
        this.baseValue = this.getPreparedValue(initValue, this.baseMaxValue, this.baseMinValue);

        this.reset();
    }

    private resetCurrentValue() {
        this.currentValue = this.baseValue.valueOf();
        this.currentMinValue = this.baseMinValue.valueOf();
        this.currentMaxValue = this.baseMaxValue.valueOf();
    }

    private recalculateShortage() {
        this.shortage = this.currentMaxValue - this.currentValue;
    }

    private recalculatePercentage() {
        this.valuePercentage = calcPercentageNumberOfNumber(this.currentValue, this.currentMaxValue);
        this.shortagePercentage = 100 - this.valuePercentage;
    }

    private getPreparedValue(value: number, maxValue: number, minValue: number) {
        if (value > maxValue) return maxValue;
        if (value < minValue) return minValue;

        return value;
    }

    private getPreparedMaxValue(value: number, maxValue: number, minValue: number) {
        if (maxValue > GLOBAL_MAX_VALUE) return GLOBAL_MAX_VALUE;
        if (maxValue <= GLOBAL_MIN_VALUE) {
            if (maxValue < value) return value;
            if (maxValue < minValue) return minValue;
            return GLOBAL_MAX_DEFAULT;
        }
        return maxValue;
    }

    private getPreparedMinValue(value: number, maxValue: number, minValue: number) {
        if (minValue < GLOBAL_MIN_VALUE) return GLOBAL_MIN_VALUE;
        if (minValue > value) return GLOBAL_MIN_VALUE;
        if (minValue > maxValue) return GLOBAL_MIN_VALUE;
        return minValue;
    }
}
