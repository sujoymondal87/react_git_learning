import {useLocation} from 'react-router-dom'
function Admin() {
    const location = useLocation()
    const path = location.pathname
    if(path === '/admin') {
        return(
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Welcome to the admin dashboard</p>
            </div>
        )
    }
    return(
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{path.split('/').pop().charAt(0).toUpperCase() + path.split('/').pop().slice(1)}</h1>
        <p>Welcome to the {path.split('/').pop().charAt(0).toUpperCase() + path.split('/').pop().slice(1)} page</p>
        
      </div>
    );
}

export default Admin