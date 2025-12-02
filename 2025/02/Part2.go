package main

import (
	"strconv"
	"strings"
	"math"
	"sort"
)

func Part2(input []string) (int, error){
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
			isInvalid := false

			for _, v := range findeTeiler(len(numberStr)){
				if v != len(numberStr) {
					var slices []string

					for j := range (len(numberStr) / v) {
						slices = append(slices, numberStr[(j * v):(j*v+v)])
					}

					isSame := true
					for _, slice := range slices {
						if slice != slices[0] {
							isSame = false
						}
					}

					if isSame { 
						isInvalid = true
					}
				}
			}

			if isInvalid {
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

func findeTeiler(n int) []int {
	if n <= 0 {
		return []int{}
	}

	var teiler []int
	// Berechne die Obergrenze für die Schleife (Quadratwurzel der Zahl)
	grenze := int(math.Sqrt(float64(n)))

	for i := 1; i <= grenze; i++ {
		// Prüfe, ob i ein Teiler ist
		if n%i == 0 {
			teiler = append(teiler, i)
			// Füge den Partner-Teiler hinzu, falls er nicht derselbe ist wie i
			if i*i != n {
				teiler = append(teiler, n/i)
			}
		}
	}

	// Sortiere die Teiler für eine übersichtliche Ausgabe
	sort.Ints(teiler)
	return teiler
}