export async function resetPassword(
    forgotPasswordLink, 
    emailField, 
    resetPasswordField, 
    confirmPasswordField, 
    submitButton, 
    email, 
    password, 
    usernameField, 
    passwordField, 
    loginBtn){
    await forgotPasswordLink.click();
    await emailField.fill(email);
    await resetPasswordField.fill(password);
    await confirmPasswordField.fill(password);
    await submitButton.click();

    await usernameField.fill(email);
    await passwordField.fill(password);
    await loginBtn.click();
}