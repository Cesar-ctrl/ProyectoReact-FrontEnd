import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import childService from '../../services/childs';
import imageService from '../../services/images';


export default function RegisterF ({...props}) {
    
    const [childs, setChilds] = useState(null) 

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggUserJSON)
    
    const [nombre, setName] = useState('')// (modoEdicion? childs.name:'')
    const [apellidos, setSurnames] = useState('')
    const [age, setEdad] = useState('')
    const [nif, setDni] = useState('')
    const [necesidades, setNecesidadesesp] = useState('')
    const [selectedFile, setImgUrl] = useState(null)
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errortext, setErrortext] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const handleDniChange = ({target}) => setDni(target.value)

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
    const [alergias, setAlergenos] = useState(
        new Array(listaalergenos.length).fill(false)
      );

      const handleOnChange = (position) => {
        const updatedAlergenos = alergias.map((item, index) =>
          index === position ? !item : item
        );
    
        setAlergenos(updatedAlergenos);
    
      };

    useEffect(() => {
        const path = window.location.pathname
        const arr = path.split("/")
        childService.setToken(user.token)
        childService.getChild(arr[4])
            .then(initialGuards => {
                setChilds(initialGuards)
            })
    }, [])
    
    
    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            var name = nombre? nombre: childs.name
            var surnames = apellidos? apellidos: childs.surnames
            var edad = age? age: childs.edad
            var DNI = nif? nif: childs.DNI
            var alergenos = alergias? alergias: childs.alergenos
            var necesidadesesp = necesidades? necesidades: childs.necesidadesesp
            var file = selectedFile? selectedFile: childs.selectedFile

            if(selectedFile !== null){
                imageService.setToken(user.token)
                const imgUrl = await imageService.subeImg(childs.id, {
                    file
                })
                const child = await childService.update(childs.id, {
                    name,
                    surnames,
                    edad,
                    DNI,
                    alergenos,
                    necesidadesesp,
                    imgUrl
                    })
                
            }else{
                const child = await childService.update(childs.id, {
                    name,
                    surnames,
                    edad,
                    DNI,
                    alergenos,
                    necesidadesesp,
                    })
            }
            
            
            setChilds(childs)
            setEdad('')
            setDni('')
            setAlergenos('')
            setNecesidadesesp('')
            navigate("/home/child", { replace: true });
        } catch(e) {
            setError(true)
            
            setTimeout(() => {
                setErrorName('Error Update')
                setErrortext('Datos introducidos invalidos')
            }, 2000)
            setTimeout(() => {
                setErrorName('')
                setErrortext('')
                setError(false)
            }, 6000)
        }
      }

    useEffect(()=> {
        if(childs){
            setAlergenos(childs.alergenos);
        }
      }, childs)

    const errorMsg = 
      <div className='errorMsg'>
          <h2 className='errorName'>{errorName}</h2>
          <p className='errortext'>{errortext}</p>
      </div>

    if(childs){
  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                    <Link to="/home/child" state={state} className='flexea atras negro' >
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" />
                        
                    </Link>
                    <h2>Dar de alta a tu niño/a</h2>
                </header>
                
                <form action="" className='login' onSubmit={handleUpdate}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" defaultValue={childs.name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setName(e.target.value)} />
                    </fieldset>
                    
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" defaultValue={childs.surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setSurnames(e.target.value)} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="dni" className='col-10'>DNI</label>
                        <input className="col-10" type="text" name="dni" defaultValue={ childs.DNI} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="edad" className='col-10'>Edad</label>
                        <input className="col-10" type="number" name="edad" defaultValue={ childs.edad} placeholder="Introduzca su edad" pattern="[0-9]{2}" title="Debe introducir su edad 2 cifras"  onChange={ e=> setEdad(e.target.value)} />
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
                                        defaultChecked={childs.alergenos[index]}
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
                        <input className="col-10" type="text" defaultValue={ childs.necesidadesesp} name="necesidadesesp" placeholder="Escriba el niño/a tiene alguna necesidad especial" pattern="[^0-9\x22]+" onChange={ e=> setNecesidadesesp(e.target.value)} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="imagen" className='col-10'>Foto actual</label>
                        <img src={"https://babyguard.onrender.com/api/img/public/"+childs.imgUrl} alt="" name="image" className='reloj grande'/>
                        <label htmlFor="file" className='col-10'>Foto del niño</label>
                        <input className="col-10" type="file" accept="image/png, image/gif, image/jpeg" name="file" placeholder="¿Quiere subir una imagen?" onChange={(e) => setImgUrl(e.target.files[0])}  />
                    </fieldset>

                    <fieldset className='col-12 end'>
                        <label htmlFor="enviar" className='col-10'>Dar de alta</label>
                        <button className="boton-azul blanco" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Guardar</button>
                    </fieldset>
                </form>
                {
                    error?errorMsg:null
                } 
            </section>
        </section>
        
  )
}else{
    console.log("esperando")
}
}



