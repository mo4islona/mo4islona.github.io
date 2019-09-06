import React from 'react';
import Highlight from 'react-highlight';
import GoPlayground from 'material-go-playground';

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

export default function Playground() {
  return (
    <div>
      <GoPlayground
        code={code}
        title={'Go playground'}
        appendButtons={(
          <GoPlayground.ShareButton
            path="share"
            onError={alert}
          >
          Share
          </GoPlayground.ShareButton>
      )}
      />

    </div>
  );
}
