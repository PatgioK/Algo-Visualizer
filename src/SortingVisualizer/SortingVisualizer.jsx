import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 180; i++) {
            array.push(randomIntfromInterval(10, 600));
        }
        this.setState({array});
    }


    render() {
        const {array} = this.state;

        // Arrow function to use "this" context in the resetArray callback function: this.setState({array})
        return (
            <React.Fragment>
                <button onClick={() => this.resetArray()}>Generate Array</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div
                    className='array-bar' 
                    key={idx}
                    // $ dollarsign makes a css variable
                    style={{height: `${value}px`}}
                    >
                    </div>
                ))}
            </div>
            </React.Fragment>
        );
    }
}

// Generates random Integer in given interval.
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntfromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}