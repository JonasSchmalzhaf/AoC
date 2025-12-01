package main

import (
	"fmt"
	"strconv"
)

func Part1() (int, error) {
    input, err := readInput("/Users/schmalzhafj/Documents/SIT-Lehrwerkstatt/AoC/2025/01/input.txt")
	if err != nil {
		return 0, err
	}

	direction := make(map[byte]int)
	direction['L'] = -1
	direction['R'] = 1

	password := 0
	pointer := 50

	for _, line := range input {
		directionString := line[0]
		stepsString := line[1:]

		fmt.Printf("Direction: %c; Steps: %s; Pointer: %d\n", directionString, stepsString, pointer) 

		steps, err := strconv.Atoi(stepsString)
		if err != nil {
			return 0, err
		}

		for i := 0; i < steps; i++ {
			pointer += direction[directionString];

			switch pointer {
				case -1:
					pointer = 99	
				case 100:
					pointer = 0
			}
		}

		if pointer == 0 {
			password++
		}
	}

	return password, err
}