import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader.jsx'
import { userService } from '../services/user.service.js'

export function UserDetails() {
    const userId = useSelector(state => state.userModule.loggedinUser._id)
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getById(userId)
            .then(user => setUser(user))
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load user')
            })
    }, [userId])

    if (!user) return <Loader />
    console.log('user:', user)
    return (
        <div className="user-details">
            <h1>{user.fullname}</h1>
            <p>Balance: {user.balance}</p>
            <pre>{JSON.stringify(user.activities, null, 4)}</pre>

            <Link to="/">Back to home</Link>
        </div>
    )
}