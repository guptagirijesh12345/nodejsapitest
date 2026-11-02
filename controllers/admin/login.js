const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateRandomOTP} = require("../../helpers/otpHelper");
// Register API
exports.register = async (req, res) => {
    try {


       const {name,email,password,role,device_type,device_token,mobile_no,country_code}= req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({message: "Email already exists"});
        }

     const mobileExist = await User.findOne({ mobile_no });

     if(mobileExist){
        return res.status(400).json({message: "Mobile No. already exists"});
     }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name,email,mobile_no,country_code,password: hashPassword,device_type,device_token,role});

        res.status(201).json({ success: true,message: "Registration Successful", data: user});

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "Invalid Email"});
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({message: "Invalid Password"});
        }
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: "1d" });
        res.status(200).json({success: true,message: "Login Successful",token});

    } catch (err) {
        res.status(500).json({ message: err.message});
    }

};



exports.loginWithMobileNo = async (req, res) => {

    try {

        const { country_code, mobile_no } = req.body;

        const countryCode= await User.findOne({ country_code });

        if (!countryCode) {
            return res.status(400).json({message: "Invalid Contry Code"});
        }

        
        const users = await User.findOne({ mobile_no });

        if (!users) {
            return res.status(400).json({message: "Invalid Mobile No"});
        }

        const otp = generateRandomOTP();

        users.otp = otp;
        users.otp_expire = new Date(Date.now() + 5 * 60 * 1000); // 5 Minutes
        await users.save();

         return res.status(200).json({ success: true, message: "OTP sent successfully", otp: otp, mobile_no:mobile_no});


        res.status(200).json({success: true,message: "Login Successful"});

    } catch (err) {
        res.status(500).json({ message: err.message});
    }

};

exports.verifyOtp   = async(req,res)=>{

    try{

           const{mobile_no,otp,device_token,device_type} = req.body;

           const checkMobileNo  = await User.findOne({mobile_no});

           if(!checkMobileNo){       

            return res.status(404).json({success: false,message: "Mobile number is not registered"});

            }
           const checkOtp  = await User.findOne({otp});

           if(!checkOtp){
               return res.status(404).json({success: false,message: "Invalide Otp"});
           }
           checkOtp.device_token = device_token;
           checkOtp.device_type  = device_type;
           checkOtp.otp  = '';
           checkOtp.save();
           const token = jwt.sign({ id: checkOtp._id },process.env.JWT_SECRET,{ expiresIn: "1d" });
            
         return res.status(200).json({ success: true, message: "Login Sucessfully", token:token});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}