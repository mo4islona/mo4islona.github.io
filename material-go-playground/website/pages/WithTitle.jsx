import React from 'react';
import GoPlayGround from 'material-go-playground';

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

export default function WIthTitle() {
  return (
    <div>
      <GoPlayGround
        code={code}
        color="light"
        hideFormat
        toolBarStyle={{
          padding: 0,
        }}
        settingsIconStyle={{
          color: '#aaa',
        }}
        title={(
          <img
            src="https://golang.org/lib/godoc/images/go-logo-blue.svg"
            height={33}
            style={{ position: 'relative', top: 3, marginRight: 12, left: 12 }}
          />
        )}
        theme={{
          palette: {
            primary: {
              main: '#fff',
              contrastText: '#333'
            },
            // background: {
            //   paper: '#fff',
            //   default: '#fff'
            // }
          },
        }}
      />
    </div>
  );
}
