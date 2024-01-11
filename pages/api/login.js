import cookie from "cookie"

const handler = (req, res) => {
    if(req.method === "POST"){
        const {Username, password} = req.body
        if (Username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
                res.setHeader("Set-Cookie", cookie.serialize("adminToken", process.env.TOKEN, {
                    maxAge: 60*60,
                    sameSite: "strict",
                    path: "/",
                })
            )
            res.status(200).json("Succesfull")
        } else{
            res.status(400).json("Incorrect Credentials")
        }   
    }
}

export default handler