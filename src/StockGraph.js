import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export const StockGraph = (props) => {
    const {displayName, data} = props;


    const graphOptions = {
          title: {
            text: displayName
          },
          series: [
            {
              data: data
            }
          ]
    }

    return <div className='stock-chart'>
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={graphOptions}
        />
    </div>
}