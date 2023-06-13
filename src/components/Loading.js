import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

export const Loading = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      // eslint-disable-next-line global-require
      animationData: require('../assets/leafloader.json')
    })
  }, [])
  return (
    <Wrapper>
      <div className="container" ref={container}> </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 300px;
  height: 300px;
`;