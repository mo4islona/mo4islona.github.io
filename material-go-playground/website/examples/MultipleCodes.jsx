import React from 'react';
import GoPlayground from 'material-go-playground';

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

export default function Minimal() {
  return (
    <div>
      <GoPlayground
        code={code}
        useTextOnButton={false}
        hideFormat
        settingsIconStyle={{display: 'none'}}
      />
    </div>
  );
}
