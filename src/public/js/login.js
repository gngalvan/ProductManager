const loginForm = document.getElementById('login');
const panelLogin = document.getElementById('panelLogin');


loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        email,
        password
    }
    try {
        let loginFetch = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        
        let response = await loginFetch.json();
        if (!response.autorizated) {
          panelLogin.textContent = "Credenciales Incorrectas";
        } else {
          window.location.href = '/products';
        }
      
        loginForm.reset();
      } catch (error) {
        console.log("Error al realizar la solicitud:", error);
      }
   
})