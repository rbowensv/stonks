import React, {useState} from 'react';
import { STOCK_SYMBOL } from './app-constants';

export function StockSearch(props) {
    const [searchText, setSearchText] = useState('');
    const clearSearch = () => {
        setSearchText('');
        clearSearchSuggestions();
    }

    const {
        searchSuggestions,
        getSearchSuggestion,
        pushStock,
        clearSearchSuggestions,
        viewedStocks
    } = props;

    return (
        <div className='stock-search'>
        {(viewedStocks.length < 3) && <div>
            <label htmlFor='stock-search' className='stock-search--label'>Search stocks</label>
            <input
            type='text'
            id='stock-search' 
            placeholder='Search...'
            value={searchText}
            className='stock-search--input' 
            onChange={(e) => {
                getSearchSuggestion(e.target.value)
                setSearchText(e.target.value)
                }} 
            />
            <div className='stock-search--suggestions'>
                { searchSuggestions && 
                    (searchSuggestions.map((result) => {
                    return <button 
                    key={result[STOCK_SYMBOL]}
                    value={result.symbol}
                    name={result.name}
                    className={`stock-search--suggestion ${result.symbol}`} 
                    onClick={(e) => {
                        pushStock({symbol: e.target.value, name: e.target.name})
                        setSearchText('');
                        clearSearch()
                        }}>
                        {result.displayName}
                    </button>
                }))}
            </div>
        </div>}
        {(viewedStocks.length === 3) && <div className='stock-search--full'>Remove a stock to compare a different one.</div>}
    </div>
    );
}