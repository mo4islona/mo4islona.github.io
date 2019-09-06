import React from 'react';
import Grid from '@material-ui/core/Grid';
import Highlight from 'react-highlight';
import GoPlayGround from 'material-go-playground';

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
`;

export default function Tests() {
  return (
    <div>
      <Highlight className="jsx"/>

      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <GoPlayGround
            title={'Test success'}
            code={`
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
`}
            hideFormat
            useTextOnButton={false}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <GoPlayGround
            title={'Test fail'}
            code={codeTestFail}
            hideFormat
            useTextOnButton={false}
          />
        </Grid>
      </Grid>
    </div>
  );
}
