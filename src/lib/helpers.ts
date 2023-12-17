export const calculateScore = (bet: number, result: number, max = 100) => {
	return max - Math.abs(bet - result);
};
