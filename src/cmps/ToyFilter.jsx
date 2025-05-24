import { useState, useEffect, useRef } from 'react'
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Box
} from '@mui/material'


import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
    const availableLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const [filterByToEdit, setFilterByToEdit] = useState({
        ...filterBy,
        labels: filterBy.labels || [],
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
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <Box
                component="form"
                className="filter-form"
            >
                <TextField
                    id="name"
                    name="txt"
                    label="Name"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <TextField
                    id="maxPrice"
                    name="maxPrice"
                    label="Max Price"
                    type="number"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <FormControl>
                    <InputLabel id="inStock-label">In Stock</InputLabel>
                    <Select
                        labelId="inStock-label"
                        name="inStock"
                        value={filterBy.inStock === undefined ? 'all' : filterBy.inStock.toString()}
                        label="In Stock"
                        onChange={(ev) => {
                            const value = ev.target.value
                            const inStock = value === 'all' ? undefined : value === 'true'
                            onSetFilter({ ...filterBy, inStock })
                        }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="true">In Stock</MenuItem>
                        <MenuItem value="false">Out of Stock</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="labels-label">Labels</InputLabel>
                    <Select
                        labelId="labels-label"
                        id="labels"
                        multiple
                        name="labels"
                        value={filterByToEdit.labels}
                        onChange={handleChange}
                        input={<OutlinedInput label="Labels" />}
                    >
                        <MenuItem value="__ALL__">-- All Labels --</MenuItem>
                        {availableLabels.map((label) => (
                            <MenuItem key={label} value={label}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="sortBy-label">Sort By</InputLabel>
                    <Select
                        labelId="sortBy-label"
                        id="sortBy"
                        name="sortBy"
                        value={filterByToEdit.sortBy || ''}
                        label="Sort By"
                        onChange={handleChange}
                    >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="created">Created</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </section>
    )
}