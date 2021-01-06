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
const ANIMATION_SPEED_MS = 1000;

// Lower bound height for bars
const LOWER_INTERVAL = 10;

// Upper bound height for bars.
const UPPER_INTERVAL = 250

// Number of array bars.
const NUMBER_OF_BARS = 4;

// Javascript sleep() best practice found at:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
const sleep = (ms) => {
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

    mergeSort = async () => {
        console.log('start mergesort');
        const arry = this.state.array.slice();
        const auxArray = this.state.array.slice();

        await this.mergeSortHelper(arry, auxArray, 0, arry.length - 1);

    }

    mergeSortHelper = async (arry, auxArray, start, end) => {
        console.log('start mergesorthelper');
        if (start === end) {
            return;
        }

        const middle = Math.floor((start + end) / 2);
        await this.mergeSortHelper(arry, auxArray, start, middle);
        await this.mergeSortHelper(arry, auxArray, middle + 1, end);
        await this.doMerge(arry, auxArray, start, middle, end);

    }

    doMerge = async (arry, auxArray, start, middle, end) => {
        console.log('start doMerge');
        let a = start; // Arry start
        let b = start; // auxArray start
        let c = middle + 1; // midStart

        while (b <= middle && c <= end) {
            arry[b].color = SECONDARY_COLOR;  // change color of comparing bars
            arry[c].color = SECONDARY_COLOR;

            if (auxArray[b] <= auxArray[c]) {

                arry[a] = auxArray[b];
                this.setState({ array: arry });
                sleep(ANIMATION_SPEED_MS);

                arry[a].color = PRIMARY_COLOR;  // change color of comparing bars
                arry[c].color = PRIMARY_COLOR;

                a++;
                b++;
            } else {
                arry[a] = auxArray[c];
                this.setState({ array: arry });
                sleep(ANIMATION_SPEED_MS);

                arry[b].color = PRIMARY_COLOR;  // change color of comparing bars
                arry[a].color = PRIMARY_COLOR;

                a++;
                c++;
            }
        }

        while (b <= middle) {
            arry[b].color = SECONDARY_COLOR;
            arry[a] = auxArray[b];
            this.setState({ array: arry });
            sleep(ANIMATION_SPEED_MS);
            arry[a].color = PRIMARY_COLOR;

            a++;
            b++;
        }

        while (c <= end) {
            arry[c].color = SECONDARY_COLOR;
            arry[a] = auxArray[c];
            this.setState({ array: arry});
            sleep(ANIMATION_SPEED_MS);

            arry[a].color = PRIMARY_COLOR;
            a++;
            c++;
        }


    }


    quickSort() {
    }

    arrayLog = async () => {
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
}
