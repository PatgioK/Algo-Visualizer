// Followed from Clément Mihailescu's React tutorial 
// https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations)
    return animations;
}

function mergeSortHelper(mainArray, start, end, auxArray, animations) {
    if (start === end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(auxArray, start, middle, mainArray, animations);
    mergeSortHelper(auxArray, middle + 1, end, mainArray, animations);
    doMerge(mainArray, start, middle, end, auxArray, animations);
}

function doMerge(mainArray, start, middle, end, auxArray, animations) {
    let a = start;  //arrStart
    let b = start; //auxStart
    let c = middle + 1;  //midStart
    while (b <= middle && c <= end) {
        // These are the values we are comparing; push once to change color, push second time to revert color.
        animations.push([b, c]);
        animations.push([b, c]);

        if (auxArray[b] <= auxArray[c]) {
            // We overwrite the value at a in the original array with value at index b in the auxiliary array.
            animations.push([a, auxArray[b]]);
            mainArray[a++] = auxArray[b++];
        } else {
            // We overwrite the value at a in the original array with the value at c in the auxiliary array.
            animations.push([a, auxArray[c]]);
            mainArray[a++] = auxArray[c++];
        }
    }

    while (b <= middle) {
        // These are the values we are comparing; push once to change color, push second time to revert color.
        animations.push([b, b]);
        animations.push([b, b]);

        // We overwrite the value at a in the original array with the value b in the auxiliary array.
        animations.push([a, auxArray[b]]);
        mainArray[a++] = auxArray[b++];
    }

    while (c <= end) {
        // These are the values we are comparing; push once to change color, push second time to revert color.
        animations.push([c, c])
        animations.push([c, c])

        // We overwrite the value at a in the original array with the value c in the auxiliary array.
        animations.push([a, auxArray[c]]);
        mainArray[a++] = auxArray[c++];
    }
}


    // Followed from Clément Mihailescu's React tutorial 
    // https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial

    // mergeSort() {
    //     const animations = getMergeSortAnimations(this.state.array);
    //     const arrayBars = document.getElementsByClassName('array-bar');

    //     for (let i = 0; i < animations.length; i++) {
    //         // console.log(animations[i]);
    //         // Animations come in triplets. First two animations are what we are comparing
    //         // Third animation we overwrite the height
    //         const isColorChange = i % 3 !== 2;
    //         if (isColorChange) {
    //             const [barOneIdx, barTwoIdx] = animations[i];
    //             const barOneStyle = arrayBars[barOneIdx].style;
    //             const barTwoStyle = arrayBars[barTwoIdx].style;
    //             const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //             setTimeout(() => {
    //                 barOneStyle.backgroundColor = color;
    //                 barTwoStyle.backgroundColor = color;
    //                 // forloop happens instantly in javascript, so for each index i we want to multiply the delay by the index.
    //             }, i * ANIMATION_SPEED_MS);
    //         } else {
    //             setTimeout(() => {
    //                 const [barOneIdx, newHeight] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;

    //                 // Javascript bug, we want to get the value of the variable and then change to html + px;
    //                 // use extra functionality backtick and ${ } to embed variable into html;
    //                 barOneStyle.height = `${newHeight}px`;
    //             }, i * ANIMATION_SPEED_MS);
    //         }
    //     }
    // }