import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { userService } from "../services/user.service.js"

export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    async function loadUser() {
        if (!userId) return
        try {
            const user = await userService.getById(userId)
            console.log('user:', user)
            setUser(user)
        } catch (err){
            console.log('Had issues in user details', err)
            navigate('/')
        }
    }


    if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser._id === userId
    return (
        <section className="user-details">
            <h1>Fullname: {user.fullname}</h1>
            <h5>Score: {user.score}</h5>
            {isMyProfile && (
                <section>
                    <h2>My Stuff!</h2>
                </section>
            )}
            <p>@</p>
            <p>User is so lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/">Home</Link>
        </section>
    )
}