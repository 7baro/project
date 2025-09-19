const signinBtn = document.getElementById('signin-btn');
const signinModal = document.getElementById('signin-modal');
const modalClose = document.getElementById('modal-close');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const btnSubmit = document.getElementById('btn-submit');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
let currentStep = 1;

const phoneInput = document.getElementById('phone-number');
const firstNameInput = document.getElementById('first-name');
const familyNameInput = document.getElementById('family-name');
const emailInput = document.getElementById('email');

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone.trim());
}

function isValidName(name) {
    return /^[\u0621-\u064Aa-zA-Z\s]+$/.test(name.trim());
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone() {
    const isValid = isValidPhone(phoneInput.value);
    const parent = phoneInput.parentElement;
    
    parent.classList.remove('input-error', 'input-success');
    if (phoneInput.value.length === 0) return false;
    
    if (isValid) {
        parent.classList.add('input-success');
    } else {
        parent.classList.add('input-error');
    }
    
    return isValid;
}

function validateName(input, validationFunc) {
    const isValid = validationFunc(input.value);
    const parent = input.parentElement;
    
    parent.classList.remove('input-error', 'input-success');
    if (input.value.length === 0) return false;
    
    if (isValid) {
        parent.classList.add('input-success');
    } else {
        parent.classList.add('input-error');
    }
    
    return isValid;
}

function validateEmail() {
    const isValid = isValidEmail(emailInput.value);
    const parent = emailInput.parentElement;
    
    parent.classList.remove('input-error', 'input-success');
    if (emailInput.value.length === 0) return false;
    
    if (isValid) {
        parent.classList.add('input-success');
    } else {
        parent.classList.add('input-error');
    }
    
    return isValid;
}

signinBtn.addEventListener('click', () => {
    resetModal();
    signinModal.style.display = 'flex';
});

modalClose.addEventListener('click', () => {
    signinModal.style.display = 'none';
});

signinModal.addEventListener('click', (e) => {
    if (e.target === signinModal) {
        signinModal.style.display = 'none';
    }
});

btnNext.addEventListener('click', () => {
    if (currentStep === 1) {
        if (!validatePhone()) {
            phoneInput.parentElement.classList.add('input-error');
            return;
        }
        
        step1.classList.remove('active');
        step2.classList.add('active');
        btnNext.style.display = 'none';
        btnBack.style.display = 'block';
        btnSubmit.style.display = 'block';
        currentStep = 2;
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep === 2) {
        step2.classList.remove('active');
        step1.classList.add('active');
        btnNext.style.display = 'block';
        btnBack.style.display = 'none';
        btnSubmit.style.display = 'none';
        currentStep = 1;
    }
});

btnSubmit.addEventListener('click', () => {
    if (currentStep === 2) {
        let allValid = true;
        
        if (!validateName(firstNameInput, isValidName)) allValid = false;
        if (!validateName(familyNameInput, isValidName)) allValid = false;
        if (!validateEmail()) allValid = false;
        
        if (!allValid) return;
        
        step2.classList.remove('active');
        step3.classList.add('active');
        btnBack.style.display = 'none';
        btnSubmit.style.display = 'none';
        currentStep = 3;
        setTimeout(() => {
            signinModal.style.display = 'none';
        }, 2000);
    }
});

function resetModal() {
    step1.classList.add('active');
    step2.classList.remove('active');
    step3.classList.remove('active');
    btnNext.style.display = 'block';
    btnBack.style.display = 'none';
    btnSubmit.style.display = 'none';
    currentStep = 1;
    
    phoneInput.value = '';
    firstNameInput.value = '';
    familyNameInput.value = '';
    emailInput.value = '';
    
    phoneInput.parentElement.classList.remove('input-error', 'input-success');
    firstNameInput.parentElement.classList.remove('input-error', 'input-success');
    familyNameInput.parentElement.classList.remove('input-error', 'input-success');
    emailInput.parentElement.classList.remove('input-error', 'input-success');
}

phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
    validatePhone();
});

firstNameInput.addEventListener('input', () => validateName(firstNameInput, isValidName));
familyNameInput.addEventListener('input', () => validateName(familyNameInput, isValidName));
emailInput.addEventListener('input', validateEmail);