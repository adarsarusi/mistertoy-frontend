import { Loader } from "../cmps/Loader.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js"

import { useEffect } from 'react' 
import { Link, useSearchParams } from 'react-router-dom' 
import { useSelector } from 'react-redux' 

export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const isLoading = useSelector(state => state.toyModule.isLoading)

    // Special hook for accessing search-params:
    // const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // setSearchParams(filterBy)
        loadToys(filterBy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        if (!confirm('Are you sure?')) return
        
        removeToy(toyId)
            .then(() => {
                showSuccessMsg(`Toy removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }

    // function onToggleToy(toy) {
    //     const toyToSave = { ...toy, inStock: !toy.inStock }
    //     saveToy(toyToSave, true)
    //         .then(savedToy => {
    //             showSuccessMsg(`Todo is ${(savedTodo.inStock)? 'done' : 'back in stock'}`)
    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //             showErrorMsg('Cannot toggle todo ' + toyId)
    //         })
    // }

    if (!toys) return <Loader />
    return (
        <section className="toy-index">
            <header>
                <ToyFilter />
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </header>
            {isLoading ? 
                <Loader /> : 
                <ToyList 
                    toys={toys} 
                    onRemoveToy={onRemoveToy}/>}
        </section>
    )
}