import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import GoPlayground from 'material-go-playground';
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const code = `package main

import (
  "fmt"
)

func main() {
  fmt.Println("Hello, playground")
}`;

const code2 = `package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("Hello, playground")
  
  go func() {
    time.Sleep(20)
    fmt.Println("Hello, playground, again!")
  }()
  
  time.Sleep(30)
}`;

const codeLongOutput = `package main

import (
  "fmt"
  "time"
)

func main() {
  for i:=0; i<=30; i++ {
    fmt.Println("Hello, playground")
    time.Sleep(1)
  }
}`;

const codeError = `package main

import (
  "fmt"
  //"time"
)

func main() {
  fmt.Println("Hello, playground")
  
  go func() {
    time.Sleep(20)
    fmt.Println("Hello, playground, again!")
  }()
  
  time.Sleep(30)
}`;

const codeImports = `package main

import (
  "fmt"
  "github.com/torden/go-strutil"
)

func main() {
  strutil := strutils.NewStringProc()
  example_str := "a\\\\bcdefgz"
  fmt.Println(strutil.StripSlashes(example_str))
}`;


const codeTestFail = `
package main

import (
  "testing"
)

func Abs(i int) int {
  return 5
}

func TestAbs(t *testing.T) {
    got := Abs(-1)
    if got != 1 {
        t.Errorf("Abs(-1) = %d; want 1", got)
    }
}
`
const codeTestSuccess = `
package main

import (
  "testing"
)

func Abs(i int) int {
  return 1
}

func TestAbs(t *testing.T) {
    got := Abs(-1)
    if got != 1 {
        t.Errorf("Abs(-1) = %d; want 1", got)
    }
}
`


function Title({children}) {
  return <Typography variant="body1">{children}</Typography>;
}

function App() {
  return (
    <MuiThemeProvider>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">React go playground component</Typography>
        </Toolbar>
      </AppBar>
      <div style={{marginTop: 80}}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              title={<Title>Default</Title>}
              code={code2}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              title={<Title>Light theme</Title>}
              code={code2}
              color='light'
              compactButtons
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography variant="h6" style={{fontWeight: 400, marginTop: -6}}>Custom theme</Typography>
            <GoPlayground code={code} theme={{
              palette: {
                primary: {
                  main: orange[500],
                },
              },
              overrides: {
                MuiButton: {
                  root: {
                    borderRadius: "20px !important",
                  },
                },
              },
            }}/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography variant="h6" style={{fontFamily: "monospace"}}>Minimal with custom font</Typography>
            <GoPlayground
              code={code}
              color='light'
              compactButtons
              hideFormat
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
                  fontFamily: "monospace",
                },
                overrides: {
                  MuiButton: {
                    root: {
                      borderRadius: "20px !important",
                    },
                  },
                },
              }}/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              code={codeError}
              compactButtons showFormat={false}
              title={<Title>With error</Title>}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              code={codeImports}
              compactButtons showFormat={false}
              title={<Title>Imports</Title>}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              code={code}
              readOnly
              hideFormat
              compactButtons showFormat={false}
              title={<Title>Readonly</Title>}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              code={code}
              color='light'
              hideFormat
              toolBarStyle={{
                padding: 0,
              }}
              settingsIconStyle={{
                color: "#aaa",
              }}
              title={
                <img
                  src="https://golang.org/lib/godoc/images/go-logo-blue.svg"
                  height={33}
                  style={{position: "relative", top: 3, marginRight: 12}}
                />
              }
              theme={{
                palette: {
                  primary: {
                    main: "#fff",
                  },
                },
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              code={codeLongOutput}
              hideFormat
              editorHeight={150}
              resultHeight={80}
              compactButtons
              title={<Title>Editor height 150px<br/>Result height 80px</Title>}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography variant="h6" style={{fontWeight: 400, marginTop: -6}}>Without header</Typography>
            <GoPlayground
              code={code}
              hideHeader
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              title={<Title>Test fail</Title>}
              code={codeTestFail}
              hideFormat
              compactButtons
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <GoPlayground
              title={<Title>Test success</Title>}
              code={codeTestSuccess}
              hideFormat
              compactButtons
            />
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

render(
  <App/>,
  document.getElementById("root"),
);
