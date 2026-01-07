// All solutions assume that n > 0

function sum_to_n_a(n: number): number {
	// Using Gauss' formula for summation from 1 to n. This is the most efficient solution, only having a time complexity of O(1) 
    return n * (n + 1) / 2;   
}

function sum_to_n_b(n: number): number {
	// Using a for loop. This solution has a time complexity of O(n)
    let sum: number = 0;

    for (let i: number = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

function sum_to_n_c(n: number): number {
    // Using recursion. This solution has a time complexity of O(n)
	if (n == 1) {
        return 1;
    } else {
        return n + sum_to_n_c(n - 1);
    }
}