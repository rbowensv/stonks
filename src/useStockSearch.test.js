import { renderHook, act } from '@testing-library/react-hooks'
import * as App from './App'
import { useStockSearch } from "./useStockSearch";

jest.mock('./App');

const mockGetData = {
    bestMatches: [
        {
          "1. symbol": "E",
          "2. name": "Eni Spa",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-04",
          "8. currency": "USD",
          "9. matchScore": "1.0000"
        },
        {
          "1. symbol": "E.TRT",
          "2. name": "Enterprise Group",
          "3. type": "Equity",
          "4. region": "Toronto",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-05",
          "8. currency": "CAD",
          "9. matchScore": "0.4000"
        }
      ]
}

test('should not explode', () => {
    const {stuff} = renderHook(() => useStockSearch());
    expect(true).toBeTruthy();
})

//TODO this needs more testing, I just can't for the life of me remember how to set it up