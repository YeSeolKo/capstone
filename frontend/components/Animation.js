import React from 'react'
import Lottie from 'react-lottie-player'
import lottieJson from '/public/animation.json'
//lottie anitmation 크기 조절: style로 

//홈화면 로티파이 애니메이션 
export default function Animation() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
    //   style={{ width: 150, height: 150 }}
    />
  )
}