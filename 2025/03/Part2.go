package main

import (
	//"fmt"
	"strconv"
)

func Part2(input []string) (int, error){
	var result int

	for _, bank := range input {
		var highestBat []int

		startIter := 0

		for i := range 12 {
			bankSlice := bank[startIter:(len(bank) - (12 - i - 1))]

			for j, v := range bankSlice {
				vInt, err := strconv.Atoi(string(v))
				if err != nil { return 0, err }

				isHeighest := true

				for _, w := range bankSlice {
					wInt, err := strconv.Atoi(string(w))
					if err != nil { return 0, err }

					if vInt < wInt {
						isHeighest = false
					}
				}

				if isHeighest {
					highestBat = append(highestBat, vInt)
					startIter += j
					break
				}
			}

			startIter++
		}

		highestBatInt, err := toInt(highestBat[:])
		if err != nil { return 0, err }
		result += highestBatInt
	}

	return result, nil
}

func toInt(intArray []int) (int, error) {
	var intString string
	for _, i := range intArray {
		intString += strconv.Itoa(i)
	}

	return strconv.Atoi(intString)
}