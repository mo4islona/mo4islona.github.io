import React from "react";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import GoPlayGround from "material-go-playground";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

export default function Themes() {
  return <div>
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Typography variant="h6" style={{fontWeight: 400, marginTop: -6}}>Custom colors</Typography>
        <GoPlayGround
          code={code}
          theme={{
            palette: {
              primary: {
                main: orange[500],
              },
            },
            overrides: {
              MuiButton: {
                root: {
                  borderRadius: '20px !important',
                },
              },
            },
          }}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Typography variant="h6" style={{fontFamily: 'monospace'}}>With font</Typography>
        <GoPlayGround
          title={'Monospace'}
          code={code}
          color="light"
          theme={{
            palette: {
              primary: {
                main: green[500],
              },
              secondary: {
                main: orange[500],
              },
            },
            typography: {
              fontFamily: 'monospace',
            },
            overrides: {
              MuiButton: {
                root: {
                  borderRadius: '20px !important',
                },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  </div>
}