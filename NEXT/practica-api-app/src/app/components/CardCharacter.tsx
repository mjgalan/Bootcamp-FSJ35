"use client";

import { guardarFavorito } from '../actions/favoritos'

//Declarar la interface para los props.

import { Character } from '../types'

interface CardCharacterProps{
    id:number;
    nombre:string;
    estado:string;
    imagen:string;
}

export default function CardCharacter({id, nombre, estado, imagen}: CardCharacterProps) {

  const handleGuardar = async() => {
    const personaje={
        id:id,
        name: nombre,
        status: estado,
        image: imagen
    }
    await guardarFavorito(personaje);
    alert('Guardado en favoritos');
  } 
  return (
    <div className='border rounded-xl overflow-hidden bg-gray-800'>
        <img src={imagen} alt={nombre} className='w-full h-64'/>
        <section className='p-4'>
            <h2 className='text-lg font-bold'>{nombre}</h2>   
            <p className='text-sm mt-2'>{estado}</p>
            <button onClick={handleGuardar}>Guardar en favoritos</button>
        </section>
    </div>

  )
}
