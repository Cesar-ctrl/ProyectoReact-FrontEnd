import React, { useState, useEffect } from 'react'
import guardService from '../services/guards'
import Star from '../components/Star'


const PerfilGuard = ({ }) => {

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggUserJSON)

    const loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guardian = JSON.parse(loggGuardJSON)

    const [guard, setGuards] = useState([]) 
    const [Id, setId] = useState("")
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [horariofin, setHorariofin] = useState('')
    const [horarioinicio, setHorarioinicio] = useState('')
    const [descr, setDesc] = useState(guard.descripcion)

    const label = guard.disponible
    ? 'make not disponible'
    : 'make disponible';


    useEffect(() => {
        const path = window.location.pathname
        const arr = path.split("/")
        setId(arr[4])
        if(user){
            guardService.setToken(user.token)
        }if(guardian){
            guardService.setToken(guardian.token)
        }
        guardService.getGuard(arr[4])
            .then(initialGuards => {
                setGuards(initialGuards)
            })
        setName(guard.name)
        setSurnames(guard.surnames)
        
    }, [])
    useEffect(() => {
        setDesc(guard.descripcion)
        setHorarioinicio(guard.horarioinicio)
        setHorariofin(guard.horariofin)
    }, [])
    const handleDescrChange = ({target}) => setDesc(target.value)

    const handleHorarioinicioChange = ({target}) => setHorarioinicio(target.value)
    const handleHorariofinChange = ({target}) => setHorariofin(target.value)

    const changeDesc = () => {
        const guardd = guard.id
        const changedGuard = { ...guardd, descripcion: descr }
        guardService
            .putdesc(guard.id, changedGuard.descripcion)
            .then(returnedGuard => {
            setGuards(returnedGuard)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }
    
    const toggleDisponible = () => {
        const guardd = guard
        const changedGuard = { ...guardd, disponible: !guardd.disponible }
        console.log(changedGuard)
        guardService
            .updateDisp(guardd.id, changedGuard.disponible)
            .then(returnedGuard => {
            setGuards(returnedGuard)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }

    const changeHorario = () => {
        const guardd = guard.id
        var changedGuard1 = { ...guardd, horarioinicio: horarioinicio }
        var changedGuard2 = { ...guardd, horariofin: horariofin }
        if(horarioinicio == undefined){
            changedGuard1 ={ ...guardd, horarioinicio:  guard.horarioinicio }
        } if(horariofin == undefined){
            changedGuard2 = { ...guardd, horariofin:  guard.horariofin }
        }
        guardService
            .puthorario(guard.id, changedGuard1.horarioinicio, changedGuard2.horariofin)
            .then(returnedGuard => {
            setGuards(returnedGuard)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }
    if( guard.dias){
  return (
    <section className="home">
        <header className='titulo main flexea perfil'>
            <div className='foto'>
            <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+guard.imgUrl} className='reloj' alt="" />
            </div>
            <h2>{guard.name} {guard.surnames}</h2>
        </header>
        <section className='flexea column'>
            <div className='col-10 column listado deperfil'>
            <div className='cuidador flexea roww'>
                {user?  <p>{guard.descripcion}</p> : guardian?  guardian.id==guard.id? 
                <div>
                    <textarea name="descripcion" id="descr" cols="30" rows="5" defaultValue={descr} onChange={handleDescrChange} >{guard.descripcion}</textarea> 
                    <input type="button" value="Guardar" onClick={() => changeDesc()} />
                </div>
                : <p>{guard.descripcion}</p>:<p>{guard.descripcion}</p>}
                
            </div>
                <div className='cuidador flexea wrap'>
                    <div className='horadisp flexea column'>
                        <img src="../../img/reloj-grande.png" className="reloj" alt="" />
                        {user?<h3>{guard.horarioinicio}-{guard.horariofin}</h3> : guardian? guardian.id==guard.id?
                            <div>
                                <input className="col-12" type="time" name="horarioinicio" defaultValue={ guard.horarioinicio} value={horarioinicio} onChange={ handleHorarioinicioChange} />
                                <input className="col-12" type="time" name="horariofin" defaultValue={ guard.horariofin} value={horariofin}  min={horarioinicio}  onChange={ handleHorariofinChange} />
                                <input type="button" value="Guardar" onClick={() => changeHorario()} />
                            </div>
                            : <h3>{guard.horarioinicio}-{guard.horariofin}</h3>
                            :<h3>{guard.horarioinicio}-{guard.horariofin}</h3>
                            
                        }
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>L</th>
                                    <th>M</th>
                                    <th>X</th>
                                    <th>J</th>
                                    <th>V</th>
                                    <th>S</th>
                                    <th>D</th>
                                </tr>
                                <tr>

                                    <td>{guard.dias[0]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[1]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[2]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[3]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[4]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[5]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[6]? <img src="../../img/Light_green_check.svg" className="dias" alt="" /> : <img src="../../img/Red_x.svg" className="dias" alt="" />}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className='nombreval flexea column'>
                            
                        </div>
                    </div>
                    {
                       user? <br /> : guardian? guardian.id==guard.id?
                       <button onClick={toggleDisponible}>{label}</button>
                       : <br />:<br />
                    }
                    
                </div>
                <div className="flexea roww evenly">
                    {<Star />}

                    <h3>4.8</h3>
                </div>

            </div>
        </section>
        
    </section>
  )
}
else{
    console.log("esperando")
}
}

export default PerfilGuard