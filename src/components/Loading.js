import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web'

export const Loading = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line global-require
      animationData: require('../assets/plant.json')
    })
  }, [])
  return (
    <div>
      <div className="container" ref={container}> </div>
    </div>
  )
}