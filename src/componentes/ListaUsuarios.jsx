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
    const [updatedAt, setUpdatedAt] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getUsuarios = async () => {
        const response = await axios.get(url);
        setUsuarios(response.data);
    }

    useEffect(() => {
        getUsuarios();
    });

    const openModal = (operation, id, email, password, name,role) => {
        setId('');
        setEmail('');
        setPassword('');
        setName('');
        setRole('');

        if (operation === 1) {
            setTitleModal('Registrar Usuario');
            setOperation(1);
        } else if (operation === 2) {
            setTitleModal('Modificar Usuario');
            setId(id);
            setEmail(email);
            setPassword(password);
            setName(name);
            setRole(role);
            setOperation(2);
        }
    }

    const enviarSolicitud = async (url, metodo, parametros) => {
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        await axios(obj).then(() => {
            let mensaje;

            if (metodo === 'POST') {
                mensaje = 'Se guardó el producto';
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el producto';
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el producto';
            }
            alertaSuccess(mensaje);
            document.getElementById('btnCerrarModal').click();
            getUsuarios();
        }).catch((error) => {
            alertaError(error.response.data.message);
            console.log(error);
        });
    }

    const validar = () => {
        let payload;
        let metodo;
        let urlAxios;

        if (name === '') {
            alertaWarning('Escriba el nombre del Usuario', 'name');
        } else if (email === '') {
            alertaWarning('Escriba email del usuario', 'email');
        } else if (password === '') {
            alertaWarning('Escriba la Contraseña del usuario', 'password');
        } else if (role === '') {
            alertaWarning('Escriba role del usuario', 'role');
        } else {
            payload = {
                name: name,
                email: email,
                password: password,
                role: role,
                images: ['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            };

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = 'https://api.escuelajs.co/api/v1/users/';
            } else {
                metodo = 'PUT';
                urlAxios = ` https://api.escuelajs.co/api/v1/users/${id}`;
            }

            enviarSolicitud(urlAxios, metodo, payload);
        }
    }

    const deleteProducto = (id) => {
        let urlDelete = `https://api.escuelajs.co/api/v1/users/${id}`;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud(urlDelete, 'DELETE', {});
            }
        }).catch((error) => {
            alertaError(error);
            console.log(error);
        });
    }

    return (
        <div className='App'>
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
                                    usuarios.map((usuarios, i) => (
                                        <tr key={usuarios.id}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{usuarios.id}</td>
                                            <td>{usuarios.email}</td>
                                            <td>{usuarios.password}</td>
                                            <td>{usuarios.name}</td>
                                            <td>{usuarios.role}</td>
                                            <td><img src={usuarios.avatar} className="img-thumbnail" alt='Aavatar'></img> </td>
                                            <td>
                                                <button onClick={() => openModal(2, usuarios.id, usuarios.email, usuarios.password, usuarios.name,usuarios.role)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                    <i className='fa-solid fa-edit' />
                                                </button>
                                                <button onClick={() => deleteProducto(usuarios.id)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titleModal}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='cloase' />
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id' />
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                <input type='text' id='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment' /></span>
                                <input type='text' id='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='name' className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='role' className='form-control' placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                        <button onClick={() => validar()} className='btn btn-success'>
                            <i className='fa-solid fa-floppy-disk' /> Guardar
                        </button>
                        <button id='btnCerrarModal' className='btn btn-secondary' data-bs-dismiss='modal'>
                            Cerrar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaUsuarios;