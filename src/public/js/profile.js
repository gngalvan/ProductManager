const logout =  async () => {
    const rs = await fetch(`/api/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    });

    const response = await rs.json();
    if(response.logout){
        window.location.href='/login'
    }else{
        console.log(response)
    }

}