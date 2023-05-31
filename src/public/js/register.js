const registerForm = document.getElementById('register');


registerForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        firstName,
        lastName,
        email,
        password
    }

    fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .catch(error => {
        console.error(error);
      });
registerForm.reset();
})