
// Random 4 Digit OTP
const generateRandomOTP = () => {

    
    return Math.floor(1000 + Math.random() * 9000).toString();
};

module.exports = {
    generateRandomOTP
};