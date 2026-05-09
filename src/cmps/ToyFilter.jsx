import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utilService } from '../services/util.service.js'

export function ToyFilter() {
	const filterBy = useSelector(state => state.toyModule.filterBy)
	const dispatch = useDispatch()

	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

	const debouncedApplyFilter = useRef(
		utilService.debounce(updatedFilter => {
			dispatch({ type: SET_FILTER_BY, filterBy: updatedFilter })
		}, 500)
	).current

	useEffect(() => {
		debouncedApplyFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		const field = target.name
		let value = target.value

		if (target.multiple) {
			value = Array.from(target.selectedOptions, option => option.value)
		}

		if (field === 'sortDir') value = +value

		setFilterByToEdit(prev => ({ ...prev, [field]: value }))
	}

	const { name, inStock, labels, sortBy, sortDir } = filterByToEdit

	return (
		<section className='toy-filter'>
			<form>
				<div className="filtering">
					<label>Name:</label>
					<input
						type='search'
						name='name'
						value={name || ''}
						onChange={handleChange}
						placeholder='Search toy...'
					/>

					<label>Status:</label>
					<select name='inStock' value={inStock || 'all'} onChange={handleChange}>
						<option value='all'>All</option>
						<option value='in'>In Stock</option>
						<option value='out'>Out of Stock</option>
					</select>

					<label>Labels:</label>
					<select
						name='labels'
						multiple
						value={labels || []}
						onChange={handleChange}
					>
						<option value='On wheels'>On wheels</option>
						<option value='Box game'>Box game</option>
						<option value='Art'>Art</option>
						<option value='Baby'>Baby</option>
						<option value='Doll'>Doll</option>
						<option value='Puzzle'>Puzzle</option>
						<option value='Outdoor'>Outdoor</option>
						<option value='Battery Powered'>Battery Powered</option>
					</select>
				</div>

				<div className='sorting'>
					<label>Sort By:</label>
					<select name='sortBy' value={sortBy || 'name'} onChange={handleChange}>
						<option value='name'>Name</option>
						<option value='price'>Price</option>
						<option value='createdAt'>Created</option>
					</select>

					<label>Sort Dir:</label>
					<select name='sortDir' value={sortDir || 1} onChange={handleChange}>
						<option value={1}>Ascending</option>
						<option value={-1}>Descending</option>
					</select>
				</div>
			</form>
		</section>
	)
}