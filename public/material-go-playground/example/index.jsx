import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import GoPlayground, { ShareButton } from 'material-go-playground';

const defaultCode = `package main

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

function Logo({style, color = '#00acd7'}) {
  return <svg height="20" viewBox="0 0 207 78" xmlns="http://www.w3.org/2000/svg" style={style}>
    <g fill={color} fillRule="evenodd">
      <path d="m16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z"/>
      <path d="m1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z"/>
      <path d="m25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z"/>
      <g transform="translate(55)">
        <path
          d="m74.1 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7-3.6 0-8.1 0-19.3 0-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z"/>
        <path
          d="m107.2 77.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z"
          fillRule="nonzero"/>
      </g>
    </g>
  </svg>
}

function App() {
  const {width, height} = useWindowSize();
  const {code, loading} = useSnippet();

  const _height = height - (width > 500 ? 64 : 56) - 8;

  if(loading) {
    return null
  }

  return <GoPlayground
    title={width > 500 ? "The Go playground" : (width < 350 ? null : <Logo color="#fff" style={{position: "relative", top: 4, left: -4}}/>)}
    code={code}
    color={localStorage.getItem('color') || 'light'}
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
    onColorChange={(color) => {
      localStorage.setItem('color', color)
    }}
    onRun={()=>{
      console.log('Run started')
    }}
    onFormat={()=>{
      console.log('Format started')
    }}
    onImportFormat={(val) => {
      localStorage.setItem('imports', val)
    }}
  />
}

function useSnippet() {
  const snippet = window.location.hash.substring(1);

  const [code, setCode] = useState(defaultCode)
  const [loading, setLoading] = useState(snippet.length > 1)


  useEffect(() => {
    if(!loading) return;

    fetch(`https://play.golang.org/p/${snippet}.go`).then((res) => {
      return res.text().then((code) => {
        setCode(code);
        setLoading(false);
      })
    }).catch(() => {
      setLoading(false);
    })
  }, [])

  return { code, loading }
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
