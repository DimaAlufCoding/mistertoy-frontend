import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'


export function ToyList({ toys, onRemoveToy, addToCart }) {
    const currUser = userService.getLoggedinUser()

    return (
        <ul className="car-list">
            {toys.map(toy =>
                <li className="car-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {currUser && currUser._id === toy.owner._id && (
                            <Link to={`/toy/edit/${toy._id}`}>
                                <button>Edit</button>
                            </Link>
                        )}
                        <Link to={`/toy/${toy._id}`}><button>Details</button></Link>

                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}