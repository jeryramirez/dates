import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
const Formulario = ({crearCita}) => {

    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [error, actualizarError] = useState(false);

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    // extraer valores 
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const submitCita = e => {
        e.preventDefault();
        // validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {

            actualizarError(true)
            setTimeout(() => {
                actualizarError(false)
            }, 3000);
            return // al aniadir un return se blockea el paso a la siguiente linea
        }
        //asginar un Key Id ya que el componente de citas se va a repetir
        cita.id = uuid();
        
        //crear la cita
        crearCita(cita);
        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        });

    }
    return(
        <Fragment>
            <h1> Crear Cita</h1>

            {error ? <p className='alerta-error'> Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de mascota'
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Citas
                </button>
            </form>
        </Fragment>
    )
    
}
 
export default Formulario;