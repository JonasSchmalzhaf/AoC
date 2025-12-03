package main

import (
	"strconv"
)

func Part1(input []string) (int, error) {
	var result int

	for _, bank := range input {
		var highestBat int

		for i, v := range bank {
			for _, w := range bank[(i + 1):] {
				jolts, err := strconv.Atoi(string(v) + string(w))
				if err != nil {
					return 0, err
				}

				if jolts > highestBat {
					highestBat = jolts
				}
			}
		}

		result += highestBat
	}

	return result, nil
}