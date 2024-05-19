document.addEventListener("DOMContentLoaded", function() {
    var changePasswordButton = document.getElementById('changePasswordButton');
    var modifyButton = document.getElementById('modifyButton');

    changePasswordButton.addEventListener('click', showPasswordInput);
    modifyButton.addEventListener('click', modifyPassword);
});

function showPasswordInput() {
    var newPasswordGroup = document.getElementById('new-password-group');
    newPasswordGroup.classList.remove('hidden');
}

function modifyPassword() {
    var newPassword = document.getElementById('newPasswordInput').value;
    // Aici poți adăuga funcționalitatea pentru a modifica parola folosind newPassword
    alert("Parola a fost modificată cu succes!");
    // Ascunde input-ul și butonul după ce parola a fost modificată
    document.getElementById('new-password-group').classList.add('hidden');
}