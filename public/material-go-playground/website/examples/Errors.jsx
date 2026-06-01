import React from 'react';
import GoPlayground from 'material-go-playground';

const code = `package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("Hello, playground")
  
  unknownFunction()
  go func() {
    time.Sleep(20)
    fmt.Println("Hello, playground, again!")
  }()
  
  asdasdasd
  time.Sleep(30)
}`;

export default function Minimal() {
  return (
    <div>
      <GoPlayground
        code={code}
        useTextOnButton={false}
        hideFormat
      />
    </div>
  );
}
