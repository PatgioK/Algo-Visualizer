import React from "react";
import "./SortingVisualizer.css";
// import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
import { setTimeout } from "timers";

// Original color of the array bars.
const PRIMARY_COLOR = "aqua";

// Color we change to when we are comparing array bars.
const SECONDARY_COLOR = "green";

// Speed of the animation in ms.
const ANIMATION_SPEED_MS = 4;

// Number of array bars.
const NUMBER_OF_BARS = 20;

const sleep = (millis) => {
    return new Promise((resolve) => setTimeout(resolve, millis));
};

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }

    // React function runs first time component is rendered, client side only.
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            array.push({
                height: randomIntfromInterval(100, 101),
                color: PRIMARY_COLOR
            });
        }
        this.setState({ array });
    }


    // TODO: fix color bug when two bars have the same height.
    animateSorting = async (sorted_array) => {
        const { array } = this.state;
        for (let i = 0; i < sorted_array.length; i++) {
            const orig_index = array.findIndex(
                (item) => item.height === sorted_array[i]
            );
            array[orig_index].color = SECONDARY_COLOR;
            this.setState(array);
            await sleep(ANIMATION_SPEED_MS);
            arraymove(array, orig_index, i);
            this.setState(array);

            if (orig_index !== i) await sleep(ANIMATION_SPEED_MS);
        }
    };

    insertionSort() {
        const { array } = this.state;
        const sorted = array.reduce((sorted, el) => {
            // console.log(el);
            let index = 0;
            while (index < sorted.length && el.height < sorted[index]) index++;
            sorted.splice(index, 0, el.height);
            return sorted;
        }, []);
        // console.log(sorted);

        this.animateSorting(sorted);
    }

    render() {
        const { array } = this.state;
        return (
            // Arrow function to use "this" context in the resetArray callback function: this.setState({array}). Javascript closure.
            // React.Fragment allows us to return multiple elements under the same DOM.
            <React.Fragment>
                <div className="button-bar">
                    <button onClick={() => this.resetArray()}>Generate Array</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
                <div className="array-container">
                    {array.map((item, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            // $ dollarsign makes a css variable???
                            style={{
                                backgroundColor: `${item.color}`,
                                height: `${item.height}px`
                            }}
                        ></div>
                    ))}
                </div>
            </React.Fragment>
        );
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
}

// Generates random Integer in given interval.
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntfromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
