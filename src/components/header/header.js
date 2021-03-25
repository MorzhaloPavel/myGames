import React from 'react'
import './header.css'

export default function Header({restartGames, counter}) {
  return (
    <div className='header'>
      <button onClick={() => restartGames()} className='header-btn'>Перемешать)</button>
      <h1 className='header-counter'>Счётчик: {counter}</h1>
    </div>
  )
}

