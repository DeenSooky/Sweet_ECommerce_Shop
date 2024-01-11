import axios from "axios"
import {useRouter} from "next/router"
import { useState } from "react"
import styles from "../../styles/Login.module.css"

const Login = () => {

    const[Username, setUsername] = useState(null)
    const[password, setpassword] = useState(null)
    const[error, seterror] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        try{

            console.log("Username:", Username)
            console.log("password:", password)



            await axios.post("http://localhost:3000/api/login", {
                Username,
                password,
            })

            console.log("before redirection:")

            router.push("/admin");


            console.log("After redirection:")


        }catch(err){
            console.log(err)
            seterror(true)
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                <input placeholder="username..." className={styles.input} onChange={(e) => setUsername(e.target.value)}/>
                <input placeholder="password..." type="password" className={styles.input} onChange = {(e) => setpassword(e.target.value)}/>
                <button onClick={handleClick} className={styles.button}>Sign in</button>
                {error && <span className={styles.error}>Incorrect Credentials, please try again</span>}
                
            </div>
        </div>
    )
}

export default Login 