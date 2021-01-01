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
        for(let i = 0; i < 500; i++) {
            array.push(randomIntfromInterval(10, 1000));
        }
        this.setState({array});
    }


    render() {
        const {array} = this.state;

        return (
            <>
                {array.map((value, idx) => (
                    <div className='array-bar' key={idx}>
                    {value}
                    </div>
                ))
                
                
                }
            </>
        );
    }
}

// Generates random Integer in given interval.
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntfromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}