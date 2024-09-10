type InterpolationParams = {value: number, minInput: number, maxInput: number, minOutput: number, maxOutput: number}

export function interpolate({value, minInput, maxInput, minOutput, maxOutput}: InterpolationParams) {
    if (value < minInput || value > maxInput) {
        throw new Error("Value out of interval");
    }

    return minOutput + ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput);
}

export function interpolateCircularInverse({value, minInput, maxInput, minOutput, maxOutput}: InterpolationParams) {
    const inputRange = maxInput - minInput;
    const outputRange = maxOutput - minOutput;

    let normalizedValue = ((value - minInput) % inputRange + inputRange) % inputRange;
    return minOutput + (1 - (normalizedValue / inputRange)) * outputRange;
}
