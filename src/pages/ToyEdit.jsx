import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    

    const hasChanges = useRef(false)
    useConfirmTabClose(hasChanges)

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
            return
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        hasChanges.current = true
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        const toyToSave = { ...toyToEdit, price: toyToEdit.price || 100 }

        try {
            await saveToy(toyToSave)
            showSuccessMsg('Toy saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
    }

    return (
        <section className="car-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}