import React, {useState} from 'react';



const defaultCurrencies = ['RUB', 'USD', 'EUR','MDL'];
const allDefaultCurrencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNH', 'CNY', 'COP', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VND','VUV','WST','XAF','XCD','XDR','XOF','XPF','YER','ZAR'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency}) => {
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        setIsDivVisible(!isDivVisible);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    const filteredCurrencies = allDefaultCurrencies.filter((cur) =>
        cur.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}>
          {cur}
        </li>
      ))}

      <li onClick={handleClick}>
        <svg height="50px" viewBox="0 0 50 50" width="50px">
          <rect fill="none" height="50" width="50" />
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
        </svg>
      </li>
    </ul>
      <input
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          type="number"
          placeholder={0}
      />
      <div className="canteinerModal">
          {isDivVisible && <div  className="modal">
              <input
                  className='inputVal'
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                  <button className="clear-button" onClick={handleClear}>
                      &#10060;
                  </button>
              )}
            <ul className="currenciesAll">
                {filteredCurrencies.map((cur) => (
                    <li
                        onClick={() => onChangeCurrency(cur)}
                        className={(currency === cur ? 'active' : '')}
                        key={cur}>
                        {cur}
                    </li>
                ))}
            </ul>
        </div>}
      </div>


  </div>
);};
