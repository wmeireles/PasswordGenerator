const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll (".option input"),
copyIcon = document.querySelector (".input-box span"),
passwordInput =document.querySelector(".input-box input"),
passIndicator =document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { // object of letter, numbers e symbols 
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}

const generatePassword = () => {
    let staticPassword = "",
    excludeDuplicate = false,
    randomPassword = "",
    passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked){

            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword += ` ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
            
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar)  || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;     
}

const updadePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";

}

const updateSlider = () => {
    //passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updadePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
