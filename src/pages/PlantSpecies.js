import React from 'react'
import { Link } from 'react-router-dom'

export const PlantSpecies = () => {
// Link element needs to be brapped inside a map of plant api
  return (
    <section>
      <Link to={`/${plantid}`}>
        Create & Insert SinglePlantSpecies component here
      </Link>
    </section>
  )
}