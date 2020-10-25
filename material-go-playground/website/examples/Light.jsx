import React from 'react';
import Typography from '@material-ui/core/Typography';
import GoPlayGround from 'material-go-playground';

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

export default function Light() {
  return (
    <div>
      <GoPlayGround
        code={code}
        color="light"
      />
    </div>
  );
}
