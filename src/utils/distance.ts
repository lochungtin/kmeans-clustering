export const euclidean = (arr1: Array<number>, arr2: Array<number>) => {
    let len = arr1.length;
    let sum = 0;

    for (let i = 0; i < len; ++i)
        sum += Math.pow((arr1[i] - arr2[i]), 2);

    return Math.sqrt(sum);
}

export const manhattan = (arr1: Array<number>, arr2: Array<number>) => {
    let len = arr1.length;
    let sum = 0;

    for (let i = 0; i < len; ++i)
        sum += Math.abs(arr1[i] - arr2[i]);

    return sum;
}
