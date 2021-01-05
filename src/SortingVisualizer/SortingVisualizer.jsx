import React from "react";
import "./SortingVisualizer.css";
//import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
import { setTimeout } from "timers";

// Original color of the array bars.
const PRIMARY_COLOR = "aqua";

// Color we change to when we are comparing array bars.
const SECONDARY_COLOR = "green";

// Speed of the animation in ms.
const ANIMATION_SPEED_MS = 100;

// Number of array bars.
const NUMBER_OF_BARS = 40;

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
                height: randomIntfromInterval(198, 200),
                color: PRIMARY_COLOR
            });
        }
        this.setState({ array });
    }

    insertionSort = async () => {
        const { array } = this.state;
        let auxArray = array.slice();

        for(let i = 0; i < array.length; i++) {
            array[i].color = SECONDARY_COLOR;
            this.setState(array);
            await sleep(ANIMATION_SPEED_MS);
            var sortedIndex = array.findIndex(
                (el) => el.height >= array[i].height
            );
            arraymove(array, i, sortedIndex);
            this.setState(array);

            await sleep(ANIMATION_SPEED_MS);
        }
    }


    render() {
        const { array } = this.state;

        return (
            // Arrow function to use "this" context in the resetArray callback function: this.setState({array}).
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
    // animateSorting = async (sorted_array) => {
    //     const { array } = this.state;
    //     for (let i = 0; i < sorted_array.length; i++) {
    //         const orig_index = array.findIndex(
    //             (item) => item.height === sorted_array[i]
    //         );
    //         array[orig_index].color = SECONDARY_COLOR;
    //         this.setState(array);
    //         await sleep(ANIMATION_SPEED_MS);
    //         arraymove(array, orig_index, i);
    //         this.setState(array);

    //         if (orig_index !== i) await sleep(ANIMATION_SPEED_MS);
    //     }
    // };

    // insertionSort() {
    //     const { array } = this.state;
    //     const sorted = array.reduce((sorted, el) => {
    //         let index = 0;
    //         while (index < sorted.length && el.height < sorted[index]) index++;
    //         sorted.splice(index, 0, el.height);
    //         return sorted;
    //     }, []);

    //     this.animateSorting(sorted);
    // }
}

// Generates random Integer in given interval.
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntfromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
