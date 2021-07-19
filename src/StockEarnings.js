import React from 'react'
import doge from './tothemoon.gif'
import sell from './homersell.gif'

export const StockEarnings = (props) => {
    const { earnings } = props;

    const isProfitable = earnings ? earnings.thisQuarter > earnings.lastQuarter : null;

    const proffitClass = isProfitable ? 'stock-earnings--green' : 'stock-earnings--red';

    return <div className='stock-earnings'>Earnings:
                {earnings ? <div className='stock-earnings--row'>
                    <div className={proffitClass}>
                        {isProfitable ? 
                            <img className='stock-earnings--meme' src={doge} alt='doge in rocket, text to the moon flashing rainbow'/> : 
                            <img className='stock-earnings--meme' src={sell} alt='homer simpson shout to phone Sell!'/>
                        }
                    </div> 
                    <div className='stock-earnings--section'>
                        <div>Reported Earnings: {earnings['thisQuarter']}</div>
                        <div>{isProfitable ? '+ ' : ''}{earnings.thisQuarter/earnings.lastQuarter*100 - 100}%</div>
                    </div> 
                </div> : <div>
                    Something went wrong
                </div>}
            </div>
}