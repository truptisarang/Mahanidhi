const logout_controller  = (req, res) =>{
    res.clearCookie('session_token',{
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',  
        sameSite: "Strict", 
        path: "/",
    })

    res.json("Successfully logged out")
}

module.exports = logout_controller;