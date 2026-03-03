/**
 * Returns the current local date in YYYY-MM-DD format.
 * This avoids UTC timezone shifts that occur with toISOString().
 */
export const getLocalDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
