
// Random 4 Digit OTP
const generateRandomOTP = () => {

    // create random otp genartae
    return Math.floor(1000 + Math.random() * 9000).toString();
};


module.exports = {
    generateRandomOTP
};