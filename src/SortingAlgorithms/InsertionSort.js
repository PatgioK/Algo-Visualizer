export function getInsertionSortAnimations(array) {
    let auxArray = array;
    const animations = [];
    if(auxArray.length === 1)
        return;

    for(let i = 1; i < auxArray.length; i++) {
        let value = auxArray[i];
        let j = i - 1;
        animations.push([i, auxArray[i]]);   //initial index
        while(j >= 0 && auxArray[j] > value) {
            auxArray[j + 1] = auxArray[j];
            j = j - 1;
        }
        auxArray[j + 1] = value;
        animations.push([j + 1, value]);    //sorted index
    }
    return animations;
}

