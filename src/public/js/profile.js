const logout =  async () => {
    const rs = await fetch(`/api/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await rs.json();
    if(response.logout){
        window.location.href='/'
    }else{
        console.log(response)
    }

}