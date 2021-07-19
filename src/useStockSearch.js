import { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash'
import { axiosInstance } from './App';
import { ERROR_MESSAGE_OBJECT, STOCK_NAME, STOCK_SYMBOL, THROTTLE_MESSAGE_OBJECT } from './app-constants';

export const useStockSearch = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false}
    });
    
    const getSearchSuggestion = (keywords) => {
        const searchConfig = {
            params: {
                function: 'SYMBOL_SEARCH',
                keywords
            }
        }
        axiosInstance.get(null, searchConfig).then(response => {
            const {status, data} = response;
            if(status===200 && !_.isEmpty(data) && !_.isEqual(data,THROTTLE_MESSAGE_OBJECT) && !_.isEqual(data, ERROR_MESSAGE_OBJECT)){
                const results = data['bestMatches'];
                const displayableResults = results.map((result) => {
                    return {
                        displayName: result[STOCK_SYMBOL] + ': ' + result[STOCK_NAME],
                            ...result,
                        symbol: result[STOCK_SYMBOL],
                        name: result[STOCK_NAME]
                    }
                })
                if(isMounted.current) {
                    setSearchSuggestions(displayableResults);
                }  
            } else {
                setSearchSuggestions([]);
            }
        })
        .catch(error => {
            throw error;
        });
    };

    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [viewedStocks, setViewedStocks] = useState([]);

    const pushStock = (stock) => {
        if(isMounted.current){
            setViewedStocks([...viewedStocks, stock])
        }
    }

    const removeStock = (stock) => {
        if(isMounted.current){
            setViewedStocks(viewedStocks.filter((val) => {
                return val.symbol !== stock
            }))
        }
    }

    const clearSearchSuggestions = () => {
        if(isMounted.current){
            setSearchSuggestions([]);
        }
    }
    
    return {
        searchSuggestions,
        getSearchSuggestion,
        setViewedStocks,
        viewedStocks,
        pushStock,
        removeStock,
        clearSearchSuggestions
    };
}
