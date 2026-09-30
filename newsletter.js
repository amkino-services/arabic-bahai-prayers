function handleCaptchaResponse() {
  var event = new Event('captchaChange');
  document.getElementById('sib-captcha').dispatchEvent(event);
  window.grecaptcha = window.turnstile;
}

window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
window.LOCALE = 'ar';

window.EMAIL_INVALID_MESSAGE =
  window.SMS_INVALID_MESSAGE =
  "المعلومات المُدخلة غير صحيحة. يُرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى.";

window.REQUIRED_ERROR_MESSAGE =
  "يُرجى إدخال بريدك الإلكتروني.";

window.GENERIC_INVALID_MESSAGE =
  "المعلومات المُدخلة غير صحيحة. يُرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى.";

window.INVALID_NUMBER =
  "المعلومات المُدخلة غير صحيحة. يُرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى.";

window.INVALID_DATE = 'Please enter a valid date';
window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';

window.translation = {
  common: {
    selectedList: '{quantity} list selected',
    selectedLists: '{quantity} lists selected',
    selectedOption: '{quantity} selected',
    selectedOptions: '{quantity} selected'
  }
};

var AUTOHIDE = Boolean(0);
