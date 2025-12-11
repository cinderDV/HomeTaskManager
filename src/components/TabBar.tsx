import '../styles/tabbar.css'

import TabButton from './TabButton'

export default function TabBar(){
    return <>
        <div className='tabs-container'>
            <TabButton ruta='/home'nombre='Home'></TabButton>
            <TabButton ruta='/user'nombre='User'></TabButton>
        </div>
    </>
}
