



const Admin = ({admin, length}) => {

   

    return <div className="admin">
                <p>Hi, <span>{admin.login}</span></p>  
                <p>ID: <span>{admin._id}</span></p>       
                <p>Password: <span>{admin.password}</span></p>   
                <p>You added <span>{length}</span> words</p>    
            </div>
    
}

export default Admin;