import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { logout } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('logout successfully')
        } catch (err) {
            console.log('Logout failed', err)
            showErrorMsg('OOPs try again')
        }
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Mister Toy</h1>
                <Stack spacing={2} direction="row">
                    <Button component={NavLink} to="/toy" variant="contained" color="primary">
                        Toys
                    </Button>
                    <Button component={NavLink} to="/about" variant="contained" color="primary">
                        About
                    </Button>
                    <Button component={NavLink} to="/dashboard" variant="contained" color="primary">
                        Dashboard
                    </Button>
                    <Button variant="contained" color="primary" onClick={onLogout}>Logout</Button>

                </Stack>
                
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} </span>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>
    )
}




// export default function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }
