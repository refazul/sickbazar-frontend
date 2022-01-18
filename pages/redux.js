import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount
} from '../services/reducers/counterSlice'

export default function Redux() {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')

    return (
        <div>
            <div className="">
                <button
                    className=""
                    aria-label="Increment value"
                    onClick={() => dispatch(incrementAsync(1))}
                >
                    +
                </button>
                <span className="">{count}</span>
                <button
                    className=""
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>
            {/* omit additional rendering output here */}
        </div>
    )
}