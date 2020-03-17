const validatePhone = phone => {
    // номер телефона должен быть в формате 375291112233 только 12 цифр
    const phoneCodes = ["29", "33", "44", "25" ];
    if (!phone) return false;
    if (phone.length < 12) return false;
    let phoneCode = phone.slice(3, 5);
    if (phoneCodes.indexOf(phoneCode) !== -1) return true;
    else return false;
}

export {
    validatePhone
}