import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'


export function ToyList({ toys, onRemoveToy, addToCart }) {
    const currUser = userService.getLoggedinUser()
    console.log('toys', toys)
    // if (!Array.isArray(toys)) return <p>Loading toys...</p>

    return (
    <ul className="car-list">
        {toys.map(toy => {
            console.log('Rendering toy:', toy)
            return (
                <li className="car-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {currUser && toy.owner && currUser._id === toy.owner._id && (
                            <Link to={`/toy/edit/${toy._id}`}>
                                <button>Edit</button>
                            </Link>
                        )}
                        <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>
            )
        })}
    </ul>
)
}