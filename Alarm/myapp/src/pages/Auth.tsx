import React from 'react'
import axios from 'axios'

const Login = () => {
    const [login, setLogin] = React.useState(true)

    
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        setFormData({ username: "", password: "" })

        const url = login ?"http://localhost:5000/auth/login" : "http://localhost:5000/auth/register"


        try {
            const res = await axios.post(url, formData)
            window.localStorage.setItem("user", JSON.stringify(res.data.user))
        } catch (error : any) {
            alert(error.message)
            console.log(error)
        }
    }
    return (
        <div>
            {
                login ? <h1>Login</h1> : <h1>Register</h1>
            }
            <form onSubmit={handelSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handelOnChange} required /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handelOnChange} value={formData.password} name="password" required /><br />
                {
                    login ? <button type="submit">Login</button> :
                        <button type="submit">Register</button>
                }

            </form>
            {
                login ? <p>Don't have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setLogin(false)} >Register</span></p> 
                : <p>Already have an account? <span onClick={() => setLogin(true)} style={{ cursor: "pointer", color: "blue" }} >Login</span></p>
            }

        </div>
    )
}

export default Login
