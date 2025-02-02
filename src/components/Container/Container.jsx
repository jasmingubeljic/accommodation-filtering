
import { Outlet } from 'react-router-dom'
export default function Container () {

    return <div className="container mx-auto p-3 md:p-5">
        <h1 className="text-lg uppercase text-gray-800 tracking-wide">Accommodations</h1>
        <p className="text-sm text-gray-400">Jasmin Gubeljić ~ Task</p>
        <Outlet />
    </div>

}