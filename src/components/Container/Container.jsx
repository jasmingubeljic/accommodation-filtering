
import { Outlet } from 'react-router-dom'
export default function Container () {

    return <>
        <h1 className="text-lg uppercase text-gray-800 tracking-wide">Accommodations</h1>
        <p className="text-sm text-gray-400">Jasmin Gubeljić ~ Task</p>
        <Outlet />
    </>

}