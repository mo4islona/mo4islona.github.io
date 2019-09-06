import React from 'react';
import Typography from '@material-ui/core/Typography';
import Highlight from 'react-highlight';
import GoPlayGround from 'material-go-playground';

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

let height = document.documentElement.clientHeight - 64 - 8;
window.onresize = function () {
  height = document.documentElement.clientHeight - 64 - 8;
};

export default function Readonly() {
  return (
    <div>
      <Typography variant="h1">Readonly demo</Typography>

      <Highlight className="jsx" />

      <Typography variant="h6" style={{ fontWeight: 400, marginTop: -6 }}>Custom theme</Typography>
      <GoPlayGround
        code={code}
        readOnly
        hideFormat
      />


    </div>
  );
}
