export const calculateScore = (bet: number, result: number, max = 100) => {
	return max - Math.abs(bet - result);
};

export const getOrdinalSuffix = (number) => {
	const suffixes = ['th', 'st', 'nd', 'rd'];
	const v = number % 100;
	return number + (v >= 11 && v <= 13 ? 'th' : suffixes[v % 10] || 'th');
};
