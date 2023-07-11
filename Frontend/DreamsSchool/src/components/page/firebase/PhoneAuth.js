import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {authication} from "./Firebase"
 

const genrateRecapture = () => {
   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }, authication);
}



const sentOtp = (number, setToggle,setPhone) => {

    if (number.length === null  || number.length==="") {
        alert("Enter 10 digit number !")
        return false;
    } else if (number.length < 13) {
        alert("Enter valid number !")
        return false;
    }
     else {
      genrateRecapture();
      const appVerifier = window.recaptchaVerifier;
   
      signInWithPhoneNumber(authication, number, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
        
      // ...
   
      setToggle(true)
    }).catch((error) => {
      console.log(error)
    });
    } 

    // setPhone("")
}


const verifyOtp = (otp, setToggle,hideNumberFiled,
  setPhone,setVerifyToken,verifyMassage,verifyErrorMassaage) => {
  setToggle(true);
  hideNumberFiled(true);
confirmationResult.confirm(otp).then((result) => {
  // User signed in successfully.
  const user = result.user.phoneNumber;
  if(user){
  setPhone(user)
  setVerifyToken(result.user.accessToken)
 
  setToggle(false);
  hideNumberFiled(false);
  verifyMassage("Phone number verification sucessful")
  }
  // ...
}).catch((error) => {
  verifyErrorMassaage("Phone number verification filed")
  if(error) {
    setToggle(true);
    hideNumberFiled(true);
  };
});
 
}


export {
    sentOtp,
    verifyOtp
}
