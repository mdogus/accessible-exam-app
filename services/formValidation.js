module.exports.loginValidation = (email, password) => {
    const errors = [];
    
    if (email === "") {
        errors.push({ message: "Lütfen a-posta adresini giriniz."});
    }
    if (password === "") {
        errors.push({ message: "Lütfen parolayı giriniz."});
    }
    if (password.length < 6) {
        errors.push({ message: "Parola en az 6 karakter olmalıdır."});
    }
};
