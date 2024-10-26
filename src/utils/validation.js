/**
 * Fonctions de validation pour les formulaires, comme la validation d'e-mails ou de mots de passe.
 */

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
        minLength.test(password) &&
        hasUppercase.test(password) &&
        hasNumber.test(password) &&
        hasSpecialChar.test(password)
    );
};
