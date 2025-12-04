package main

import (
)

func Part2(input []string) (int, error) {
	var result int

	var removed bool = true

	for removed {
		var removePosition [][]int

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
						removePosition = append(removePosition, []int {i, j})
						result++
					}
				}
			}
		}

		if len(removePosition) == 0 {
			removed = false
		}

		input = removePositions(input, removePosition)
	}

	return result, nil
}

func removePositions(input []string, removePosition [][]int) []string {
	for _, position := range removePosition {
		line := []byte(input[position[0]])

		line[position[1]] = 'X'

		input[position[0]] = string(line)
	}

	return input
}