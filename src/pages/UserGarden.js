// eslint-disable-no-useless-concat
import { Weather } from 'components/Weather';
import { Loading } from 'components/Loading';
import React, { useState, useEffect } from 'react'

export const UserGarden = () => {
  const [loading, setLoading] = useState(false);

  if (loading) { return (<Loading />) }
  return (
    <div>
      <Weather />
      <ul>
        <li> Plant mama/papa name & info </li>
        <li> Garden grid:
        Plant list (with overview of each plant that is link to go to plant profile page)
        </li>
        <li> Plant name (ie: Sally)</li>
        <li> plant profile picture (?)</li>
        <li> last watered (?) + countdown to next watering (?)</li>
      </ul>
      <ul>
        <li> plus button to add plant takes you to pop up</li>
        <li> Insert plant name</li>
        <li> Choose plant species</li>
        <li> Birthday</li>
        <li> upload plant picture</li>
        <li> Last watered</li>
        <li> Last soil change</li>
      </ul>
    </div>
  )
}