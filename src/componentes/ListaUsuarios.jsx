import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ListaUsuarios = () => {

    const url = 'https://api.escuelajs.co/api/v1/users';
    const [usuarios, setUsuarios] = useState([]);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [avatar, setAvatar] = useState('');
    const [creationAt, setCreationAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState(1);

    const getUsuarios = async () => {
        const response = await axios.get(url);
        setUsuarios(response.data);
    }

    useEffect( () => {
        getUsuarios();
    });
    return(
       
        <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>id</th>
                                <th>email</th>
                                <th>password</th>
                                <th>name</th>
                                <th>role</th>
                                <th>avatar</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {
                                usuarios.map( (usuarios, i) => (
                                    <tr key={usuarios.id}>
                                        <td>{i + 1}</td>
                                        <td>{usuarios.id}</td>
                                        <td>{usuarios.email}</td>
                                        <td>{usuarios.password}</td>
                                        <td>{usuarios.name}</td>
                                        <td>{usuarios.role}</td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
      
    );
}

export default ListaUsuarios;