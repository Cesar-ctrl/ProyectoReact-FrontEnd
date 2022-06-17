import React, { useState, useEffect } from 'react'
import childService from '../services/childs'
import { useNavigate,  Link } from "react-router-dom";

export default function RegisterF ({handleSubmit, ...props}) {
    
    const [modoEdicion, setmodoEdicion] = useState(false)
    const [childs, setChilds] = useState([]) 
    const [Id, setId] = useState("")

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggUserJSON)
    
    const [name, setName] = useState(props.modoEdicion? childs.name:'')// (modoEdicion? childs.name:'')
    const [surnames, setSurnames] = useState(props.modoEdicion? childs.surnames:'')
    const [edad, setEdad] = useState(props.modoEdicion? childs.edad:0)
    const [DNI, setDni] = useState(props.modoEdicion? childs.DNI:'')
    const [necesidadesesp, setNecesidadesesp] = useState(props.modoEdicion? childs.necesidadesesp:'')
    const [child, setChild] = useState(null)
    const navigate = useNavigate();

    const handleNameChange = ({target}) => setName(target.value)
    const handleSurnamesChange = ({target}) => setSurnames(target.value)
    const handleDniChange = ({target}) => setDni(target.value)
    const handleEdadChange = ({target}) => setEdad(target.valueAsNumber)
    const handleNecesidadesespChange = ({target}) => setNecesidadesesp(target.value)

    const listaalergenos = [
        {
            name:"Gluten",
            id:1
        },
        {
            name:"Crustáceos",
            id:2
        },
        {
            name:"Huevos",
            id:3
        },
        {
            name:"Pescado",
            id:4
        },
        {
            name:"Cacahuetes",
            id:5
        },
        {
            name:"Soja",
            id:6
        },
        {
            name:"Lacteos",
            id:7
        },
        {
            name:"Frutos con cáscara",
            id:8
        },
        {
            name:"Apio",
            id:9
        },
        {
            name:"Mostaza",
            id:10
        },
        {
            name:"Sésamo",
            id:11
        },
        {
            name:"Sulfitos",
            id:12
        },
        {
            name:"Altramuces",
            id:13
        },
        {
            name:"Moluscos",
            id:14
        }
        

    ]
    const [alergenos, setAlergenos] = useState(
        new Array(listaalergenos.length).fill(false)
      );

      const handleOnChange = (position) => {
        const updatedAlergenos = alergenos.map((item, index) =>
          index === position ? !item : item
        );
    
        setAlergenos(updatedAlergenos);
    
      };

    useEffect(() => {
        setmodoEdicion(props.modoEdicion)
        if(props.modoEdicion){
            const path = window.location.pathname
            const arr = path.split("/")
            setId(arr[4])
            childService.setToken(user.token)
            childService.getChild(arr[4])
                .then(initialGuards => {
                    setChilds(initialGuards)
                })
            setName(childs.name)
            setSurnames(childs.surnames)
            setEdad(childs.edad)
            setDni(childs.DNI)
            setNecesidadesesp(childs.necesidadesesp)
        }

    }, [])
    
    
    const handleRegisterChild = async (event) => {
        event.preventDefault()
        try {

            const child = await childService.child({
                name,
                surnames,
                edad,
                DNI,
                alergenos,
                necesidadesesp,
                user:user.id
                })
            
            setChild(child)
            setEdad('')
            setDni('')
            setAlergenos('')
            setNecesidadesesp('')
            navigate("/home/child", { replace: true });
        } catch(e) {

        }
    
      }
    const activarModoEdicion = () => {

        console.log(childs)
        setmodoEdicion(true)

    }

    const editarHijo = async(e) =>{
        e.preventDefault()
        try{
            await childService.update(Id, {
                name,
                surnames,
                edad,
                DNI,
                alergenos,
                necesidadesesp,
                user:user.id
              })
            
            setmodoEdicion(false)
            setId("")
        }catch (error){

        }
    }
    
  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                    <Link to="/home/child" >
                        <img src="..img/back-arrow.svg" alt="" />
                        Atrás
                    </Link>
                    <h2>Dar de alta a tu niño/a</h2>
                </header>
                
                <form action="" className='login' onSubmit={modoEdicion? editarHijo:handleRegisterChild}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" value={childs.name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleNameChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" value={childs.surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleSurnamesChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="dni" className='col-10'>DNI</label>
                        <input className="col-10" type="text" name="dni" value={ childs.DNI} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="edad" className='col-10'>Edad</label>
                        <input className="col-10" type="number" name="edad" value={ childs.edad} placeholder="Introduzca su edad" pattern="[0-9]{2}" title="Debe introducir su edad 2 cifras"  onChange={ handleEdadChange} />
                    </fieldset>


                    <fieldset className='col-12' id='alergenos'>
                        {listaalergenos.map(({ name, id }, index) => {
                            return (
                                <li key={index}>
                                  <div className="flexea">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={id}
                                        checked={alergenos[index]}
                                        onChange={() => handleOnChange(index)}
                                      />
                                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                  </div>
                                </li>
                              );
                            })}
                    </fieldset>


                    <fieldset className='col-12'>
                        <label htmlFor="necesidadesesp" className='col-10'>Necesidades Especiales</label>
                        <input className="col-10" type="text" value={ childs.necesidadesesp} name="necesidadesesp" placeholder="Escriba el niño/a tiene alguna necesidad especial" pattern="[^0-9\x22]+" onChange={ handleNecesidadesespChange} />
                    </fieldset>

                    <fieldset className='col-12 end'>
                        <label htmlFor="enviar" className='col-10'>Dar de alta</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Enviar</button>
                    </fieldset>
                </form>
            </section>
        
        </section>
        
  )
}



