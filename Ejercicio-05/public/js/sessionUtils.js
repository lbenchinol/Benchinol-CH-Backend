(function () {

    document.getElementById('redirect-to-profile').addEventListener('click', () => {
        window.location('http://localhost:8080/profile');
    });

    const redirectToRegister = document.getElementById('redirect-to-register');
    redirectToRegister.addEventListener('click', () => {
        window.location('http://localhost:8080/register');
    });

})();