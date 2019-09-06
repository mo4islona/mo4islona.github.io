import React from 'react';
import Typography from '@material-ui/core/Typography';
import SimpleSource from './examples/Simple'

export default function GettingStarted() {
  return (
    <div>
      <Typography variant="body" color="textSecondary">Flexible, lightweight sandbox client for <a
        href="https://go.googlesource.com/playground">goland playground </a></Typography>

      <Typography variant="h4" style={{marginTop: 30}}>Install</Typography>

      <pre><code className="language-bash">
        npm -i material-go-playground
      </code></pre>
      or
      <pre><code class="language-bash">
        yarn add material-go-playground
      </code></pre>

      <Typography variant="h4">Example</Typography>

      <SimpleSource />
    </div>
  );
}

/*
      <Typography variant="h4">Params</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Param</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Default</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableRow>
            <TableCell component="th" scope="row">
              theme
            </TableCell>
            <TableCell align="right">Extened default theme created dy create theme</TableCell>
            <TableCell align="right">{}</TableCell>
          </TableRow>

        </TableBody>
      </Table>*/