export const hasErrors = (email:string) => {
    return email.length > 0 && !email.includes('@');
};
export const hasValid = (email:string) => {
    return email.length > 0 && email.includes('@');
};
export const hasPassword = (password:string) => {
    return password.length > 0 && password.length >= 6;
};
export const hasPasswordError = (password:string) => {
    return password.length > 0 && password.length < 6;
};