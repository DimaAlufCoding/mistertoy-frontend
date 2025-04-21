import { useState, useEffect, useRef } from 'react'

import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const availableLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const [filterByToEdit, setFilterByToEdit] = useState({
        ...filterBy,
        label: filterBy.labels || [],
        sortBy: filterBy.sortBy || '',

    })
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, selectedOptions } = target
        if (type === 'select-multiple') {
            const values = Array.from(selectedOptions, option => option.value)
            value = values.includes('__ALL__') ? [] : values

        } else {
            value = type === 'number' ? +value : value
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
                <select
                    name="inStock"
                    value={filterBy.inStock === undefined ? 'all' : filterBy.inStock.toString()}
                    onChange={(ev) => {
                        const value = ev.target.value
                        const inStock = value === 'all' ? undefined : value === 'true'
                        onSetFilter({ ...filterBy, inStock })
                    }}
                >
                    <option value="all">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
                <label htmlFor="labels">Labels:</label>
                <select id="labels"
                    name="labels"
                    multiple
                    value={filterByToEdit.labels}
                    onChange={handleChange}
                >
                    <option value="__ALL__">-- All Labels --</option>
                    {availableLabels.map(label => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                </select>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={filterByToEdit.sortBy || ''}
                    onChange={handleChange}
                >
                    <option value="">-- Select --</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="created">Created</option>
                </select>
            </form>
        </section>
    )
}