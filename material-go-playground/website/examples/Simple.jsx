import React from 'react';
import GoPlayground from 'material-go-playground';

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

export default function Simple() {
  return <GoPlayground code={code} />;
}
