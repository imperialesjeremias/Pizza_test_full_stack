export const verify = (basicToken, token) => {
    if (basicToken) {
        return `Basic ${basicToken}`;
    } else if (token) {
        return `Bearer ${token}`;
    }
};