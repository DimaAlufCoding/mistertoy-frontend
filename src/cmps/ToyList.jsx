import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'


export function ToyList({ toys, onRemoveToy, addToCart }) {
    const currUser = userService.getLoggedinUser()
    // if (!Array.isArray(toys)) return <p>Loading toys...</p>

    return (
        <ul className="toy-list">
            {toys.map(toy => {
                return (
                    <li className="toy-preview" key={toy._id}>
                        <ToyPreview toy={toy} />

                        <div className="card-button">
                            <button onClick={() => onRemoveToy(toy._id)}>x</button>
                            {currUser && toy.owner && currUser._id === toy.owner._id && (
                                <Link to={`/toy/edit/${toy._id}`}>
                                    <button>Edit</button>
                                </Link>
                            )}
                            <button className="buy" onClick={() => addToCart(toy)}>
                                Add to Cart
                            </button>
                        </div>


                    </li>
                )
            })}
        </ul>
    )
}