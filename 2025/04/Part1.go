package main

import (
)

func Part1(input []string) (int, error) {
	var result int

	for i, line := range input {
		var higherLine string = emptyLine(len(line))
		var lowerLine string = emptyLine(len(line))
		if i > 0 {
			higherLine = input[i - 1]
		}

		if i < len(input) - 1 {
			lowerLine = input[i + 1]
		}
		for j, char := range line {
			if (char == '@') {
				if checkRoll(higherLine, lowerLine, line, j) < 4 {
					result++
				}
			}
		}
	}

	return result, nil
}