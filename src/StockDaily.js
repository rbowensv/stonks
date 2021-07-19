import React from 'react'

export const StockDaily = (props) => {

    const {daily} = props;

    return <div className='stock-daily'>Daily: 
            {daily ? <div>
                <div className='stock-daily--section'>
                    <div>Open: ${daily['1. open']}</div>
                    <div>Close: ${daily['4. close']}</div>
                </div>
                <div className='stock-daily--section'>
                    <div>High: ${daily['2. high']}</div>
                    <div>Low: ${daily['3. low']}</div>
                </div>
                <div>Volume: {daily['5. volume']}</div>
            </div> : <div>Something went wrong</div>}
        </div>
}