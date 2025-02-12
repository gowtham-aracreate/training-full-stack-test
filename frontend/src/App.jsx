import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [users, setUsers] = useState([]);



  const fetchApi = async () => {
    const res = await axios.get('http://localhost:3000/users');
    // console.log(res.data)
    setUsers(res.data)

  }

  useEffect(() => {
    fetchApi()
  }, [])


  const handleClick = async () => {
    if (username == "" || age <= 0) {
      console.log("User name or age cannot be empty")
      return;
    }
    const userData = {
      username,
      age
    }
    const res = await axios.post('http://localhost:3000/users', userData);

    setUsers(res.data)
    console.log(res.data)

  }

  return (
    <>

      <ul>
        {
          users.map(user => {
            return <li key={user.id}>{user.username} {user.age} </li>
          })
        }
      </ul>

      <div>
        <input placeholder='user name' type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input placeholder='age' type='number' value={age} onChange={(e) => { setAge(e.target.value) }} />


        <button onClick={handleClick}>
          Add User
        </button>
      </div>

    </>
  )
}

export default App
