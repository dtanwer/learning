import axios from 'axios';
import React, { useEffect } from 'react'
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Home = () => {
    const [message, setMessage] = React.useState<string>("")
    const user = JSON.parse(window.localStorage.getItem("user")!)
    const id:string = user._id
    const inputref = React.useRef<any>(null)

    const logout = () => {
        window.localStorage.removeItem("user");
    }

    const [alrams, setAlarms] = React.useState<any[]>([])

    useEffect(() => {
        socket.on(id,(message:string) => {
            setMessage(message)
            setTimeout(() => {
                setMessage("")
            }, 5000);
        });
        return () => {
            socket.off("message");
        };
    }, []);

    useEffect(() => {

        const getAlarms = async () => {
            const res = await axios.get(`http://localhost:5000/alarm/${id}`)
            setAlarms(res.data.alarms)
        }
        getAlarms()
    }, [])

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const time = inputref.current.value
        const res = await axios.post(`http://localhost:5000/alarm`, { time, id })
        setAlarms([...alrams, res.data.alarm])
    }

    return (
        <div>
            <h2>Home</h2>
            {message != "" && <h1 style={{ color: "red", backgroundColor: "yellow", padding: "10px" }}>{message}</h1>}
            <h2>Set an Alarm</h2> 
            <h4>Input Date Format (2023-11-08 11:50:00)</h4>
            <form onSubmit={handelSubmit}>
                <label htmlFor="time">Alarm Time:</label>
                <input type="text" id="time" name="time" ref={inputref} placeholder="e.g., 2023-11-04 15:30:00" required />
                <button type="submit">Set Alarm</button>
            </form>
            <h2>Your Alarms</h2>

            {
                alrams.map((alarm: any) => {
                    const date = new Date(alarm.time)
                    return <div key={alarm._id}>
                        <p>{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Home
