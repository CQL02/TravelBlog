import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
    { x: "Jan 2023", y: 0 },
    { x: "Feb 2023", y: 3.3 },
    { x: "Mar 2023", y: 6.7 },
    { x: "Apr 2023", y: 10.0 },
    { x: "May 2023", y: 13.3 },
  ];
  
  const LineGraph = () => (
    <Paper>
      <Chart
        data={data}
      >
        <ArgumentAxis />
        <ValueAxis />
        <LineSeries valueField="y" argumentField="x" />
      </Chart>
    </Paper>
  );
  
  export default LineGraph;