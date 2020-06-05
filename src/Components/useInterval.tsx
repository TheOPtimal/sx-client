import React, { useRef, useEffect } from 'react'
import { callback } from './types'

export default function useInterval(callback: callback, delay: number) {
    const savedCallback = useRef(callback); // This is where we will store the callback
    this.unmountFunc = useRef<() => void>(() => clearInterval(0))

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            this.unmountFunc.current = () => clearInterval(id)
            return () => clearInterval(id);
        };
    }, [delay])
}