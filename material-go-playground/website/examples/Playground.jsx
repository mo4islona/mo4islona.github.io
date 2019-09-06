import React from 'react';
import GoPlayground, { ShareButton } from 'material-go-playground';

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
          <ShareButton
            path="share"
            onError={alert}
          >
            Share
          </ShareButton>
        )}
      />
    </div>
  );
}
