import { CollectedEntity } from '@shared/types';
import { calcPercentageNumberOfNumber } from '@shared/utils/calc-percentage-number-of-number';

import { ValueEntity } from './ValueEntity';

const GLOBAL_MAX_VALUE = 10000;
const GLOBAL_MIN_VALUE = 0;
const GLOBAL_MAX_DEFAULT = 100;

export abstract class Value {
    shortage: number = 0;
    valuePercentage: number = 0;
    shortagePercentage: number = 0;

    private baseValue: number;
    private baseMaxValue: number;
    private baseMinValue: number;

    constructor(
        private value: number,
        private maxValue: number = value,
        private minValue: number = 0,
        baseValue?: number,
        baseMaxValue?: number,
        baseMinValue?: number,
    ) {
        this.minValue = this.getPreparedMinValue(value, maxValue, minValue);
        this.maxValue = this.getPreparedMaxValue(value, maxValue, this.minValue);
        this.value = this.getPreparedValue(value, this.maxValue, this.minValue);

        if (baseValue && baseMaxValue && baseMinValue) {
            this.baseMinValue = this.getPreparedMinValue(baseValue, baseMaxValue, baseMinValue);
            this.baseMaxValue = this.getPreparedMaxValue(baseValue, baseMaxValue, this.baseMinValue);
            this.baseValue = this.getPreparedValue(baseValue, this.baseMaxValue, this.baseMinValue);
        } else {
            this.baseMinValue = this.getPreparedMinValue(this.value, this.maxValue, this.minValue);
            this.baseMaxValue = this.getPreparedMaxValue(this.value, this.maxValue, this.baseMinValue);
            this.baseValue = this.getPreparedValue(this.value, this.baseMaxValue, this.baseMinValue);
        }
    }

    reset() {
        this.resetCurrentValue();
        this.recalculate();
    }

    change(value: number) {
        this.value = this.getPreparedValue(this.value + value, this.maxValue, this.minValue);
        this.recalculate();
    }

    recalculate() {
        this.recalculateShortage();
        this.recalculatePercentage();
    }

    getEntity(): CollectedEntity {
        return {
            name: this.constructor.name,
            data: {
                value: this.value,
                maxValue: this.maxValue,
                minValue: this.minValue,
                baseValue: this.baseValue,
                baseMaxValue: this.baseMaxValue,
                baseMinValue: this.baseMinValue,
            } as ValueEntity,
        };
    }

    private resetCurrentValue() {
        this.value = this.baseValue.valueOf();
        this.minValue = this.baseMinValue.valueOf();
        this.maxValue = this.baseMaxValue.valueOf();
    }

    private recalculateShortage() {
        this.shortage = this.maxValue - this.value;
    }

    private recalculatePercentage() {
        this.valuePercentage = calcPercentageNumberOfNumber(this.value, this.maxValue);
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
