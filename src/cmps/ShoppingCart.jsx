import { useSelector, useDispatch } from 'react-redux'

import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'
import { checkout } from '../store/actions/user.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function ShoppingCart({ isCartShown }) {
    const dispatch = useDispatch()
    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function removeFromCart(toyId) {
        console.log(`Todo: remove: ${toyId} from cart`)
        dispatch({ type: REMOVE_TOY_FROM_CART, carId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    async function onCheckout() {
        const amount = getCartTotal()
        try {
            await checkout(amount)
            showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
        } catch (err) {
            console.log('Checkout Error:', err)
            showErrorMsg('There was a problem checking out!', err.message || err)
        }
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(toy._id)
                        }}>x</button>
                        {toy.name} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
