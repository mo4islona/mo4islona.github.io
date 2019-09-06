import React from 'react';
import Typography from '@material-ui/core/Typography';
import Highlight from 'react-highlight';
import GoPlayground from "material-go-playground";
require('highlight.js/styles/default.css');

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

export default function GettingStarted() {
  return (
    <div>
      <Typography variant="body" color="textSecondary">Flexible, lightweight sandbox client for goland playground <a href="https://go.googlesource.com/playground">https://go.googlesource.com/playground</a></Typography>

      <Typography variant="h4" style={{ marginTop: 30 }}>Install</Typography>

      <Highlight className="bash">
      npm -i material-go-playground
      </Highlight>
       or
      <Highlight className="bash">
      yarn add material-go-playground
      </Highlight>

      <Typography variant="h4">Example</Typography>

      <GoPlayground
        code={code}
      />
    </div>
  );
}
