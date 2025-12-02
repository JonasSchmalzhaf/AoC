package main

import (
	"strconv"
	"strings"
)

func Part1(input []string) (int, error) {
	var result int = 0

	for _, line := range input {
		min, err := strconv.Atoi(strings.Split(line, "-")[0])
		if err != nil {
			return 0, err
		}
		max, err := strconv.Atoi(strings.Split(line, "-")[1])
		if err != nil {
			return 0, err
		}

		for i := range (max - min) + 1 {
			numberStr := strconv.Itoa(min + i)

			if numberStr[0:(len(numberStr)/2)] == numberStr[(len(numberStr)/2):] {
				number, err := strconv.Atoi(numberStr)
				if err != nil {
					return 0, err
				}

				result += number
			}
		}
	}

	return result, nil
}