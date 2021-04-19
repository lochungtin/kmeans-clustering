const getRandom = (upperbound: number) => Math.floor(Math.random() * upperbound);

export const genSequence = (upperbound: number, count: number) => {
    let arr = [];
    let res = [];

    for (let i = 0; i < upperbound; ++i)
        arr.push(i);

    for (let i = 0; i < count; ++i) 
        res.push(arr.splice(getRandom(arr.length), 1)[0]);

    return res;
}