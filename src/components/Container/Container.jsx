
import { Outlet } from 'react-router-dom'
export default function Container () {

    return <>
        <h1 className="uppercase text-gray-800">Accommodations</h1>
        <Outlet />
    </>

}