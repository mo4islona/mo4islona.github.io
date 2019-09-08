import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import GoPlayground, { ShareButton } from 'material-go-playground';

const code = `package main

import (
  "fmt"
  "time"
  "math/rand"
)

func main() {
  for i:=0; i<=30; i++ {
    fmt.Println("Hello, playground")
    time.Sleep(time.Duration(rand.Intn(5)))
  }
}`;

function App() {
  const {width, height} = useWindowSize();
  const _height = height - (width > 500 ? 64 : 56) - 8;

  return <GoPlayground
    title="Go playground"
    code={code}
    appendButtons={(
      <ShareButton
        path="share"
        onError={alert}
      >
        Share
      </ShareButton>
    )}
    useTextOnButton={width > 500}
    editorHeight={_height * 0.7}
    resultHeight={_height * 0.3}
  />
}

function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

render(
  <App/>,
  document.getElementById('root'),
);
