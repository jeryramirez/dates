import React, {Fragment,useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'
function App() {

    // extraer citas iniciales del ls
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) { // si citasIniciales esta vaicio . . .
        citasIniciales = [];    //citasIniciales iniciara como un arreglo vacio
    }

    // state
    const [citas, guardarCitas] = useState(citasIniciales);


    // esta funcion se ejecuta cuando el componente esta listo u ocurren actualizaciones en el
    useEffect(() => {
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas))
        } else {
            localStorage.setItem('citas', JSON.stringify([]))
        }
    }, [citas]); //  esta parte se conoce como dependencia y es a partir de aqui que useEffect observa si hay nuevos cambios para actualizarce

    const crearCita = cita => {
        guardarCitas([
            ...citas,
            cita
        ])
    }

    const eliminarCita = id => {
        const nuevaCita = citas.filter(cita => cita.id !== id)
        guardarCitas(nuevaCita);
    }

    const titulo = citas.length === 0 ? 'No hay citas' : 'Listado de Citas'

    

    return (
    <Fragment>
        <h1>ADMINISTRADOR DE PACIENTES</h1>
        <div className='container' >
                <div className='row' >
                    <div className='one-half column' >
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className='one-half column' >
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>    
        </div>

    </Fragment>
    
  );
}

export default App;
