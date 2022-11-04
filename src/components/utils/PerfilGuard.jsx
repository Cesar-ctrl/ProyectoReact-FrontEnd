import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import guardService from '../../services/guards';
import userService from '../../services/users';
import commentService from '../../services/comments';
import solicitudesService from '../../services/solicitudes';
import Star from './Star';
import Comentario from './Comentario';
import Puntuacion from './Puntuacion';

const PerfilGuard = ({ }) => {

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUserJSON)

    const loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guardian = JSON.parse(loggGuardJSON)

    const [guard, setGuards] = useState([]) 
    const [contacts, setContacts] = useState([]) 
    const [comments, setComments] = useState([])
    const [Id, setId] = useState("")
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [horariofin, setHorariofin] = useState('')
    const [horarioinicio, setHorarioinicio] = useState('')
    const [descr, setDesc] = useState(guard.descripcion)
    const navigate = useNavigate();
    const [rating, setRating] = React.useState(0);
    const [comentario, setComentario] = useState('')
    const [solicitado, setSolicitado] = useState(false)
    
    const label = guard.disponible
    ? 'Make Not available'
    : 'Make available';


    useEffect(() => {
        const path = window.location.pathname
        const arr = path.split("/")
        setId(arr[4])
        if(usuario){
            guardService.setToken(usuario.token);
            commentService.setToken(usuario.token);
            userService.getChatUser(usuario.id)
                .then(initialGuards => {
                    setContacts(initialGuards.chats)
                })
            const bodySolicitud = { 
                user: usuario.id,
                guard:guard.id
            }
            solicitudesService.yaSolicitado(bodySolicitud)
                .then(res => {
                    console.log(res)
                    if(res.length == 0){
                        setSolicitado(false)
                    }else{
                        setSolicitado(true)
                    }
                })
        }if(guardian){
            guardService.setToken(guardian.token)
        }
        
        guardService.getGuard(arr[4])
            .then(initialGuards => {
                setGuards(initialGuards)
            })
        setName(guard.name)
        setSurnames(guard.surnames)
        setId(guard.id)
        setDesc(guard.descripcion)
        setHorarioinicio(guard.horarioinicio)
        setHorariofin(guard.horariofin)
        commentService.recieveCommentRoute(guard.id)
            .then(initialGuards => {
                setComments(initialGuards)//Cambiar, hacer un setcomments 
            }) 
        
    }, [guard.name])


    

    const handleDescrChange = ({target}) => setDesc(target.value)

    const handleHorarioinicioChange = ({target}) => setHorarioinicio(target.value)
    const handleHorariofinChange = ({target}) => setHorariofin(target.value)

    const handleComentarioChange = ({target}) => setComentario(target.value)

    const changeDesc = () => {
        const guardd = guard.id
        const changedGuard = { guardd, descripcion: descr }
        guardService
            .putdesc(guard.id, changedGuard.descripcion)
            .then(returnedGuard => {
                setRating(0)
            })
            .catch(error => {
                setTimeout(() => {
            }, 5000)   
            })
           
    }
    
    const toggleDisponible = () => {
        const guardd = guard
        const changedGuard = { ...guardd, disponible: !guardd.disponible }
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

    const handleChat = async(chats) => {
        try{
            
            const contacto = contacts.find(n => n.id === chats)
            if(!(contacto)){
                const user = await userService.postChat(usuario.id, chats)
                var userid = usuario.id
                const guard = await guardService.postChat(chats, userid)
            }
            navigate("/home/chat", { replace: true })
            
        }catch(e){

        }
    }

    const addComment = () => {
        const guardd = guard.id
        const userid = usuario.id
        const changedGuard = {
             from:userid,
             to:guardd,
             contenido: comentario,
             valoracion: rating
            }
        commentService
            .sendCommentRoute(changedGuard)
            .then(returnedGuard => {
                setGuards(returnedGuard)
                })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
        alert("Comentario añadido")
    }

    const sendSolicitud = () => {
        const bodySolicitud = { 
            user: usuario.id,
            guard:Id
        }
        solicitudesService
            .postSolicitud(bodySolicitud)
            .then(returned => {
                console.log(returned)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }

    const reciveSolicitudes = () => {
        const bodySolicitud = { 
            user: usuario.id,
            guard:Id
        }
        solicitudesService
            .getHistorySolicitudes(bodySolicitud)
            .then(returned => {
                console.log(returned)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }

    var leng = comments.length
    if(guard.dias){
        
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
            <div className='cuidador'>
                {usuario?  <p>{guard.descripcion}</p> : guardian?  guardian.id==guard.id? 
                <div>
                    <textarea name="descripcion" id="descr" cols="30" rows="5" defaultValue={descr} onChange={handleDescrChange} >{guard.descripcion}</textarea> 
                    <input type="button" value="Guardar" onClick={() => changeDesc()} />
                </div>
                : <p>{guard.descripcion}</p>:<p>{guard.descripcion}</p>}
                
            </div>
                <div className='cuidador flexea wrap'>
                    <div className='horadisp flexea column'>
                        <img src="https://babyguard.vercel.app/img/reloj-grande.png" className="reloj" alt="" />
                        {usuario?<h3>{guard.horarioinicio}-{guard.horariofin}</h3> : guardian? guardian.id==guard.id?
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

                                    <td>{guard.dias[0]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[1]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[2]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[3]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[4]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[5]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                    <td>{guard.dias[6]? <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" /> : <img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <div className='cuidador flexea wrap'>
                    {
                    guard.disponible?
                        usuario?
                        solicitado?<button className='boton-azul blanco indispuesto' >Ya solicitado</button>
                        :<button className='boton-azul blanco' onClick={() => reciveSolicitudes()}>Solicitar</button>
                        :<a className='boton-azul no-disponible blanco'>No disponible</a>
                        :<a className='boton-azul no-disponible blanco'>Registrese para solicitar</a>
                    }
                    
                    {
                       usuario?
                            <div className='pointer flexea column' onClick={() => handleChat(guard.id)}>                           
                                <img src="https://babyguard.vercel.app/img/Chat.png" className  ="reloj" alt=""  />
                                <h3>Chatear</h3>
                            </div>
                     : guardian? guardian.id==guard.id?
                       <button onClick={toggleDisponible}>{label}</button>
                       : null:null
                    }
                    
                </div>
                <div className="flexea cuidador column notcenter">
                    <h4>Valoraciones</h4>
                    
                    <section className='flexea column notcenter'>
                    {
                        <Puntuacion
                            comments={comments}
                            lengt={leng}
                        />
                    }
                    </section>
                    {
                        usuario?

                        //onClick={() => addComment()}
                        <section style={{marginBottom: '2vh'}}>
                            <h4>Escribe un comentario</h4>
                            <Star size={"w-7 h-7"} rating={rating} setRating={setRating} />    
                            <textarea name="contenido" id="contenido" cols="20" rows="5"  onChange={handleComentarioChange} >  </textarea> 
                            <input type="button" value="Guardar" onClick={() => addComment()} />
                            
                        </section>:null
                    }
                    <h4>Reseñas</h4>
                    
                    {
                        comments.map((comments, i) => //Buscar en comments
                        <Comentario
                            key={i}
                            comments={comments}
                        />
                        )
                    
                    }
                    

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