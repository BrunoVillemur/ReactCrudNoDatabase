import { Alert, Button, ListItemButton, ListItemText, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import uniqid from 'uniqid';
import { DataGrid } from '@mui/x-data-grid';



export const Listadodenombre = () => {
    const [nombre,setNombre]=useState('');
    const [listaNombres,setListaNombres]=useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [modoEditar,setModoEditar] = useState(false);
    const [error,setError]=useState(false);

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'dato', headerName: 'Dato'},
      ]
    
    const guardar = (event) =>{
        event.preventDefault();
            const nuevoNombre ={
                id:uniqid(),
                dato:nombre
            }
            if(nombre != ''){
                setListaNombres([...listaNombres,nuevoNombre]);
                setNombre('');
                setError(false);
            }else{
                setError(true);
            }
    }
    const borrar = (e) =>{
        e.preventDefault();
        const nuevo = listaNombres.filter(item=>item.id !== selectionModel[0]);
        setListaNombres(nuevo);
    }
    const actualizar = (e) =>{
        e.preventDefault();
        if(selectionModel[0] != undefined){
            const cambio = listaNombres.find( item => item.id == selectionModel[0]);
            console.log(cambio.dato)
            setNombre(cambio.dato)
            setModoEditar(true);
        }
    }
    const actualizarNombre = (e) =>{
        e.preventDefault();
        console.log(selectionModel[0])
        const newArray = listaNombres.map( item => item.id == selectionModel[0] ? {id: selectionModel[0], dato:nombre} : item);
        console.log(newArray);
        if(nombre != ''){
            setListaNombres(newArray);
            setNombre('');
            setModoEditar(false);
        }
    }
    
    
    return (
        <div>
            <h2>CRUD Básica</h2>
            <div className='row'>
                <div className='col'>
                    <h2>Listado de nombre</h2>
                    <DataGrid
                        columns={columns}
                        rows={listaNombres}
                        onSelectionModelChange={(newSelection) => {
                            setSelectionModel(newSelection);
                        }}
                        selectionModel={selectionModel}
                    />
                    <div>
                        <form onSubmit={(e)=>{borrar(e)}}>
                            <Button type='submit' className='mt-3'>Borrar Nombre</Button>
                        </form>
                        <form onSubmit={(e)=>{actualizar(e)}}>
                            <Button type='submit' className='mt-3'>Actualizar Nombre</Button>
                        </form>
                    </div>
                </div>
                <div className='col'>
                    <h2>Formulario para añadir nombres</h2>
                    <form className='form-group' onSubmit={(e)=>{ modoEditar ? actualizarNombre(e) : guardar(e)}}>
                        <div>
                            <TextField required fullWidth className='form-control' className='mt-3' id="outlined-basic" label="Nombre" variant="outlined" value={nombre}  onChange={ (e) =>{setNombre(e.target.value)}} />
                        </div>
                        <div>
                            <Button type='submit' className='mt-3'>{modoEditar ? "Editar Registro"  : "Añadir Registro"}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
