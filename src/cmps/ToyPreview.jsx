import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>In Stock : <span>{toy.inStock.toLocaleString()}</span></h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Labels: <span>{toy.labels.toLocaleString()}</span></p>
            <hr />

        </article>
    )
}

