import React from "react";
import "./SortingVisualizer.css";
//import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
import { setTimeout } from "timers";

// Original color of the array bars.
const PRIMARY_COLOR = "aqua";

// Color for when we are comparing array bars.
const SECONDARY_COLOR = "lightgreen";

// Color for sorted final bar.
const TERTIARY_COLOR = "gold"

// Speed of the animation in ms.
const ANIMATION_SPEED_MS = 100;

// Lower bound height for bars
const LOWER_INTERVAL = 10;

// Upper bound height for bars.
const UPPER_INTERVAL = 250

// Number of array bars.
const NUMBER_OF_BARS = 5;

// Javascript sleep() best practice found at:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
const sleep = (ms) => {
    console.log('sleep');
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function to move elements from one index to another.
function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

// Generates random Integer in given interval.
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntfromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

    // Generates a new array and sets it to the state.
    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            array.push({
                height: randomIntfromInterval(LOWER_INTERVAL, UPPER_INTERVAL),
                color: PRIMARY_COLOR
            });
        }
        this.setState({ array });
    }

    // Insertion sort algorithm 
    insertionSort = async () => {
        const { array } = this.state;

        for (let i = 0; i < array.length; i++) {
            array[i].color = SECONDARY_COLOR;
            this.setState(array);
            await sleep(ANIMATION_SPEED_MS);
            var sortedIndex = array.findIndex(
                (el) => el.height >= array[i].height
            );
            arraymove(array, i, sortedIndex);
            array[sortedIndex].color = TERTIARY_COLOR;
            this.setState(array);

            await sleep(ANIMATION_SPEED_MS);
        }
    }

    // Bubble sort algorithm
    bubbleSort = async () => {
        const { array } = this.state;
        console.log(array);
        await sleep(ANIMATION_SPEED_MS);
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
                array[j].color = SECONDARY_COLOR;
                array[j + 1].color = SECONDARY_COLOR;
                await sleep(ANIMATION_SPEED_MS);
                if (array[j + 1].height <= array[j].height) {
                    arraymove(array, j, j + 1);
                }
                this.setState(array);
                await sleep(ANIMATION_SPEED_MS);
                array[j].color = PRIMARY_COLOR;
                array[j + 1].color = TERTIARY_COLOR;
            }
        }
        array[0].color = TERTIARY_COLOR;  // Change last bar to finished color.
        await sleep(ANIMATION_SPEED_MS);
        this.setState(array);
        console.log(array);
    }

    // Setup function for actualMergeSort();
    mergeSort = async () => {
        const { array } = this.state;
        console.log('State Array');
        console.log(array);
        const auxArray = [];
        // console.log('before actualmergesort');
        this.actualMergeSort(array, auxArray, 0, array.length);
        // console.log('after actualmergesort');
    }

    actualMergeSort = async (array, auxArray, start, end) => {
        if (start === end) {
            return;
        }
        let middle = Math.floor((start + end) / 2);
        let midStart = middle + 1;
        this.actualMergeSort(array, auxArray, start, middle);
        this.actualMergeSort(array, auxArray, midStart, end);
        // console.log('before merging')
        // console.log(auxArray);

        // console.log('start:' + start + ' middle:' + middle + ' midStart:' + midStart + ' end:' + end);

        while (start < middle && midStart < end) {
            console.log(array[start]);
            console.log(array[midStart]);
            if (array[start].height <= array[midStart].height) {

                auxArray[start] = array[start];
                start++;
            } else {
                auxArray[start] = array[midStart];
                midStart++;
            }
        }
        console.log("auxArray[start]:");
        console.log(auxArray[start]);

        if (start === middle) {
            while (midStart < end) {
                auxArray[midStart] = array[midStart];
                midStart++;
            }
        } else {
            while (start < middle) {
                auxArray[start] = array[start];
                start++;
            }
        }
        // console.log(auxArray);
        this.setState({ array: auxArray });
        // console.log('after merging');
        // console.log('SHOULD BE DONE');
        return;
    };


    arrayLog() {
        console.log(this.state.array);
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
                    <button onClick={() => this.arrayLog()}>Array Log</button>
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
