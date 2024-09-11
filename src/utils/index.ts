export const formatNum = (pnl: string | number, fixedTo = 2): string => {
    try {
        // Convert to number if it's a string
        const numPnl = typeof pnl === 'string' ? Number(pnl) : pnl;

        // Check if it's a valid number
        if (isNaN(numPnl)) {
            throw new Error('Invalid number');
        }

        // Format to 2 decimal places
        return numPnl.toFixed(fixedTo);
    } catch (error) {
        console.error('Error formatting PNL:', error);
        return '0.00'; // Return a default value in case of error
    }
};