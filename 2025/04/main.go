package main

import (
	"bufio"
	"log"
	"os"
	"fmt"
)

func readInput(path string) ([]string, error) {
	var input []string
	readFile, err := os.Open(path)
  	if err != nil {
        return nil, err
    }

    fileScanner := bufio.NewScanner(readFile)
 
    fileScanner.Split(bufio.ScanLines)
  
    for fileScanner.Scan() {
		input = append(input, fileScanner.Text())
    }
  
    readFile.Close()

	return input, nil
}

func main() {
	input, err := readInput("/Users/schmalzhafj/Documents/SIT-Lehrwerkstatt/AoC/2025/04/input.txt")
	if err != nil {
		log.Fatal("Read Input: ", err)
	}

	part1, err := Part1(input)
	if err != nil {
		log.Fatal("Part 1: ", err)
	}

	part2, err := Part2(input)
	if err != nil {
		log.Fatal("Part 2: ", err)
	}

	fmt.Printf("Part 1: %d\n", part1)
	fmt.Printf("Part 2: %d\n", part2)
}

func emptyLine(len int) string {
	emptyLine := ""

	for _ = range len {
		emptyLine += " "
	}

	return emptyLine
}

func checkRoll(higherLine string, lowerLine string, line string, j int) int {
	var rolls int = 0

	if j > 0 {
		if higherLine[j - 1] == '@' {
			rolls++
		}

		if lowerLine[j - 1] == '@' {
			rolls++
		}

		if line[j - 1] == '@' {
			rolls++
		}
	}

	if j < len(line) - 1 {
		if higherLine[j + 1] == '@' {
			rolls++
		}

		if lowerLine[j + 1] == '@' {
			rolls++
		}

		if line[j + 1] == '@' {
			rolls++
		}
	}
	
	if higherLine[j] == '@' {
		rolls++
	}
	
	if lowerLine[j] == '@' {
		rolls++
	}

	return rolls
}