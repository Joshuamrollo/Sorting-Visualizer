import React, { useState, useEffect } from 'react'
import './SortingMain.css';

function SortingMain() {
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState('bubble');
    const [speedSlider, setSpeedSlider] = useState(10);
    const [sizeSlider, setSizeSlider] = useState(100);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const SPEED = speedSlider / 10;

    useEffect(() => {
        newArray();
    }, [])

    const nothing = () => {}

    const handleSpeedSlider = (x) => {
        setSpeedSlider(x.target.value);
    }

    const handleSizeSlider = (x) => {
        if(isStarted === true && isFinished === false){

        }else{
            setSizeSlider(x.target.value);
            newArray();
        }
    }

    const sort = () => {
        setIsStarted(true);
        if(algorithm === 'bubble') {
            bubbleSort();
        }else if(algorithm === 'quick') {
            quickSort();
        }else if(algorithm === 'heap') {
            heapSort();
        }else if(algorithm === 'merge') {
            mergeSort();
        }
    }

    const newArray = () => {
        setIsStarted(false);
        let array = [];
        for(let i = 0; i < sizeSlider; i++){
            array.push(Math.floor(Math.random() * 495) + 5);
        }
        setArray(array);
    }

    const newArrayFinished = () => {
        if(isFinished === true){
            let array = [];
            for(let i = 0; i < sizeSlider; i++){
                array.push(Math.floor(Math.random() * 495) + 5);
            }
            setArray(array);
            setIsFinished(false);
            setIsStarted(false);
        }
    }

    const selectBubble = () => {
        setAlgorithm('bubble');
    }

    const selectQuick = () => {
        setAlgorithm('quick');
    }

    const selectHeap = () => {
        setAlgorithm('heap');
    }

    const selectMerge = () => {
        setAlgorithm('merge');
    }

    const bubbleSort = () => {
        let count = 0;
        let isSorted = false;
        let newArr = [...array];
        let animations = [];

        while(!isSorted){
            isSorted = true;
            for(let i = 0; i < newArr.length - 1 - count; i++){
                animations.push([i, i + 1]);
                animations.push([i, i + 1]);
                if(newArr[i] > newArr[i + 1]){
                    animations.push([i, i + 1]);
                    swap(i, i + 1, newArr);
                    isSorted = false;
                }else{
                    animations.push([i, i]);
                }
            }
            count++;
        }
        animationsGo(animations);
    }

    const quickSort = () => {
        let arr = [...array];
        let animations = [];
        quickSortHelper(arr, 0, arr.length - 1, animations);
        animationsGo(animations);
    }
        
    function quickSortHelper(array, startIdx, endIdx, animations) {
        if(startIdx >= endIdx) return;
        let pivotIdx = startIdx;
        let leftIdx = startIdx + 1;
        let rightIdx = endIdx;

        while (rightIdx >= leftIdx) {
            animations.push([rightIdx, leftIdx]);
            animations.push([rightIdx, leftIdx]);
            if(array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
                swap(leftIdx, rightIdx, array);
                animations.push([rightIdx, leftIdx]);
            }else{
                animations.push([rightIdx, rightIdx]);
            }
            if(array[leftIdx] <= array[pivotIdx]) leftIdx++;
            if(array[rightIdx] >= array[pivotIdx]) rightIdx--;
        }
        swap(pivotIdx, rightIdx, array);
        animations.push([rightIdx, pivotIdx]);
        animations.push([rightIdx, pivotIdx]);
        animations.push([rightIdx, pivotIdx]);
        const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - rightIdx - 1;
        if (leftSubarrayIsSmaller) {
            quickSortHelper(array, startIdx, rightIdx - 1, animations);
            quickSortHelper(array, rightIdx + 1, endIdx, animations);
        } else {
            quickSortHelper(array, rightIdx + 1, endIdx, animations);
            quickSortHelper(array, startIdx, rightIdx - 1, animations);
        }
    }
    
    const heapSort = () => {
        let newArr = [...array];
        let animations = [];
        buildMaxHeap(newArr, animations);
        for(let endIdx = newArr.length - 1; endIdx > 0; endIdx--){
            animations.push([0, endIdx]);
            animations.push([0, endIdx]);
            animations.push([0, endIdx]);
            swap(0, endIdx, newArr);
            siftDown(0, endIdx - 1, newArr, animations);
        }
        animationsGo(animations);
    }

    function buildMaxHeap(array, animations) {
        const firstParentIdx = Math.floor((array.length - 2) / 2);
        for(let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
          siftDown(currentIdx, array.length - 1, array, animations);
        }
    }
      
    function siftDown(currentIdx, endIdx, heap, animations) {
        let childOneIdx = currentIdx * 2 + 1;
        while(childOneIdx <= endIdx) {
            const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;
            if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            animations.push([idxToSwap, currentIdx]);
            animations.push([idxToSwap, currentIdx]);
            if (heap[idxToSwap] > heap[currentIdx]) {
                animations.push([idxToSwap, currentIdx]);
                swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                animations.push([currentIdx, currentIdx]);
                return;
            }
        }
    }

const mergeSort = () => {
    let animations = [];
    let newArr = [...array];
    const auxiliaryArray = newArr.slice();
	mergeSortHelper(newArr, 0, newArr.length - 1, auxiliaryArray, animations);
	mergeAnimations(animations);

}

function mergeAnimations(animations){
    for(let i = 0; i < animations.length; i++){
        let bar = document.getElementsByClassName('bar');
        const colorChange = i % 3 !== 2;
        if(colorChange){
            const color = i % 3 !== 0 ? 'black' : 'red';
            setTimeout(() => {
                bar[animations[i][0]].style.backgroundColor = color;
                bar[animations[i][1]].style.backgroundColor = color;
            }, i * SPEED * 3);
        }else{
            setTimeout(() => {
                bar[animations[i][0]].style.height = `${animations[i][1]}px`;
            }, i * SPEED * 3);
        }
        if(i === animations.length - 1){
            setTimeout(() => {
                setIsFinished(true);
            }, i * SPEED * 3);
        }
    }
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
	if(startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
	mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;
	while(i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
		if(auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
            animations.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
	while(i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
		mainArray[k++] = auxiliaryArray[i++];
	}
	while(j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
		mainArray[k++] = auxiliaryArray[j++];
	}
}

    function swap(i, j, arr){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function animationsGo(animations) {
        for(let i = 0; i < animations.length; i++){
            let tempHeight = 0;
            let bar = document.getElementsByClassName('bar');
            const colorChange = i % 3 !== 2;
            if(colorChange){
                const color = i % 3 !== 0 ? 'black' : 'red';
                setTimeout(() => {
                    bar[animations[i][0]].style.backgroundColor = color;
                    bar[animations[i][1]].style.backgroundColor = color;
                }, i * SPEED);
            }else{
                setTimeout(() => {
                    tempHeight = bar[animations[i][0]].style.height;
                    bar[animations[i][0]].style.height = bar[animations[i][1]].style.height;
                    bar[animations[i][1]].style.height = tempHeight;
                }, i * SPEED);
            }
            if(i === animations.length - 1){
                setTimeout(() => {
                    setIsFinished(true);
                }, i * SPEED);
            }
        }
    }

    return (
        <div className='sorting-main'>
            <div className='nav'>
                <div className='button-container'>
                    <div className='nav-1'>
                        <button className='nav-button' onClick={isStarted === false ? sort : nothing} >Sort</button>
                        <button className='nav-button' onClick={isStarted === false ? newArray : newArrayFinished} >Create New Array</button>
                    </div>
                    <div className='nav-2'>
                        <button className={algorithm === 'bubble' ? 'selected-button' : 'nav-button'} onClick={selectBubble} >Bubble Sort</button>
                        <button className={algorithm === 'quick' ? 'selected-button' : 'nav-button'} onClick={selectQuick} >Quick Sort</button>
                        <button className={algorithm === 'heap' ? 'selected-button' : 'nav-button'} onClick={selectHeap} >Heap Sort</button>
                        <button className={algorithm === 'merge' ? 'selected-button' : 'nav-button'} onClick={selectMerge} >Merge Sort</button>
                    </div>
                    <div className='nav-3'>
                        <div className='slider-name'>Size</div>
                        <input type="range" min={10} max={190} value={sizeSlider} className="slider" onChange={handleSizeSlider} />
                        <div className='slider-name'>Speed</div>
                        <input type="range" min={2} max={20} value={speedSlider} className="slider" onChange={handleSpeedSlider} />
                    </div>
                </div>
            </div>
            <div className='bar-container'>
                {array.map((x) => {
                    return <div className='bar' style={{height: `${x}px`}}></div>
                })}
            </div>
        </div>
    )
}

export default SortingMain;
