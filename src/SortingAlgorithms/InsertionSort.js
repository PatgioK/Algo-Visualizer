export function getInsertionSortAnimations(arrayprop) {
    let array = arrayprop;
    const animations = [];
    if(array.length === 1)
        return;
    // Start at 1, because first step subarray will only contain 1 value.
    for(let i = 1; i < array.length; i++) {
        let value = array[i];
        let j = i - 1;
        animations.push([i, array[i]]);
        while(j >= 0 && array[j] > value) {
            array[j + 1] = array[j];


            j = j - 1;
        }
        array[j + 1] = value;
        animations.push([j + 1, value]);
    }
    return animations;
}

