import React, { useEffect, useState  } from 'react';
import * as _ from 'lodash';
import { axiosInstance } from './App';
import { THROTTLE_MESSAGE_OBJECT, ERROR_MESSAGE_OBJECT } from './app-constants';
import { StockEarnings } from './StockEarnings';
import { StockDaily } from './StockDaily';
import { StockGraph } from './StockGraph';

export const StockView = (props) => {
    const {
        symbol,
        name,
        removeStock
    } = props;

    const [earnings, setEarnings] = useState(null);
    const [daily, setDaily] = useState(null);
    const [graphData, setGraphData] = useState([]);

    const mapDaily = (dailyData) => {
        let result = [];
        _.forEach(dailyData, (value, key) => {
            console.log(Date.parse(key), parseFloat(value['4. close']))
            result.push([Date.parse(key), parseFloat(value['4. close'])])
        });
        setGraphData(result);
    }

    const displayName = `${symbol}: ${name}`

    const getEarnings = (symbol) => {
        const earningsConfig = {
            params: {
                function: 'EARNINGS',
                symbol: `${symbol}`
            }
        }
        axiosInstance.get(null, earningsConfig).then((response) => {
            const {status, data} = response;
            if (status === 200 && !_.isEmpty(data) && !_.isEqual(data,THROTTLE_MESSAGE_OBJECT) && !_.isEqual(data, ERROR_MESSAGE_OBJECT)) {
                setEarnings({
                    thisQuarter: data.quarterlyEarnings[0].reportedEPS,
                    lastQuarter: data.quarterlyEarnings[1].reportedEPS
                })
            }
        })
    };

    const getDaily = (symbol) => {
        const dailyConfig = {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol
            }
        }
        axiosInstance.get(null, dailyConfig).then(response => {
            const {status, data} = response;
            if(status === 200 && !_.isEmpty(data) && !_.isEqual(data,THROTTLE_MESSAGE_OBJECT) && !_.isEqual(data, ERROR_MESSAGE_OBJECT)){
                setDaily(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]])
                mapDaily(data['Time Series (Daily)'])
            }
        })
        .catch(error => {
            throw error;
        });
    };

    useEffect(() => {
        getEarnings(symbol)
        getDaily(symbol)
    }, [symbol])

    return (
        <div className='stock-view'>
            <div className='stock-view--header'>
                <div>{displayName}</div>
                <button className='stock-view--remove' onClick={() => removeStock(symbol)}>Remove</button>
            </div>
            <StockEarnings earnings={earnings}/>
            <StockDaily daily={daily}/>
            <StockGraph title={displayName} data={graphData}/>
        </div>
    )
}