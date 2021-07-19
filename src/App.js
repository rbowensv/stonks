import './App.scss';
import { ALPHA_VANTAGE_API, ALPHA_VANTAGE_ROUTE, APP_DESCRIPTION, APP_TITLE } from './app-constants';
import { StockSearch } from './StockSearch';
import { useStockSearch } from './useStockSearch';
import axios from 'axios';
import { StockView } from './StockView';

export const axiosInstance = axios.create({baseURL: ALPHA_VANTAGE_ROUTE, params: {apikey: ALPHA_VANTAGE_API}});

function App() {
  const {
    viewedStocks,
    searchSuggestions,
    getSearchSuggestion,
    pushStock,
    clearSearchSuggestions,
    removeStock
  } = useStockSearch();

  const stockSearchProps = {
      searchSuggestions,
      getSearchSuggestion,
      pushStock,
      clearSearchSuggestions,
      viewedStocks
  }

  return (
    <div className="App">
      <header className="App-header">
        {APP_TITLE}
        <div className="App-header--description">
          {APP_DESCRIPTION}
        </div>
        <StockSearch {...stockSearchProps}/>
      </header>
      <div className='stock-compare'>
        {viewedStocks && viewedStocks.map((stock) => {
          return <StockView key={stock.symbol} symbol={stock.symbol} name={stock.name} removeStock={removeStock}/>
        }
        )}
      </div>
    </div>
  );
}

export default App;
