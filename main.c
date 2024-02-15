#include <stdio.h>
#include <stdlib.h>
#include "utils.h"

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <num1> <num2> ... <numN>\n", argv[0]);
        return 1;
    }

    int num_count = argc - 1;
    int *numbers = (int *)malloc(num_count * sizeof(int));
    if (numbers == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i < num_count; i++) {
        numbers[i] = atoi(argv[i + 1]);
    }

    // printf("Before sorting:\n");
    // printArray(numbers, num_count);
    quickSort(numbers, 0, num_count - 1);

    // printf("\nAfter sorting:\n");
    for (int i = 0; i < num_count; i++) {
        printf("%d ", numbers[i]);
    }
    // printf("\n");
    free(numbers);

    return 0;
}