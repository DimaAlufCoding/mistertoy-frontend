import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>In Stock: <span>{toy.inStock ? 'Yes' : 'No'}</span></h1>
            <div className="img-container">
                <Link to={`/toy/${toy._id}`}>
                    <img
                        src={`https://robohash.org/${toy.name}?set=set1`}
                    />
                </Link>
            </div>

            <p>Price: <span>${toy.price = +toy.price}</span></p>

        </article>
    )
}

