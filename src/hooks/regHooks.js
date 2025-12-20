"use client"

import { useEffect } from "react"


/**
 * @param {String} color - New color for the body background
 * @param {Array} dependencyArray - Dependency Array for use effect
 * @return - useEffect hook that changes the background color of the body to the specified parameter
 */
export const useBodyBg = (color = "var(--text-secondary-light)", dependencyArray = [])=>{
    useEffect(()=>{
        const body = document.querySelector("body")
        body.style.background = color
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencyArray])
}