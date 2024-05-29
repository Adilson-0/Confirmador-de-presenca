export function random(){
    return (Math.random() + 1).toString(36).substring(2);
}

export function isValidEmail(email) {
    // Basic regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}