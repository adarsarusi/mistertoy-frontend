import { Link, NavLink, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
// import { getStats } from '../store/actions/todo.actions.js'
// import { Progress } from './Progress.jsx'


export function AppHeader() {
    const navigate = useNavigate()
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const dispatch = useDispatch()
    
    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
                navigate('/auth')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h2>Toys</h2>
                {/* <Progress /> */}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <span> - </span>
                    {loggedinUser ?  
                        <section className="user-info">
                            <Link to={`/user/${loggedinUser._id}`}>{loggedinUser.fullname} {loggedinUser.balance}</Link>
                            <button onClick={onLogout}>Logout</button>
                        </section> :
                        <NavLink to="/auth" >Login</NavLink>}
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
