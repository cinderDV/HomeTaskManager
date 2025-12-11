import '../styles/tabbar.css'
import { Link } from 'react-router'


export default function TabBar(){
    return <>
        <div className='tabs-container'>
            <h1>proximamente tabbs</h1>
            <li>
                <Link
                    to="/home"
                >
                    HOME
                </Link>
            </li>
            <li>
                <Link
                    to="/user"
                >
                    user
                </Link>
            </li>
        </div>
    </>
}
