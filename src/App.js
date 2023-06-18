import React, {useEffect, useRef, useState} from 'react';
import {Block} from './Block';
import './index.scss';


function App() {
    const [fromCurrency, setFromCurrency] = useState('RUB');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(1);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const handleClick = () => {
        setIsDivVisible(!isDivVisible);
    };

    const resultsRef = useRef({})

    useEffect( () => { // Активная ссылка в fetch имеет freeTrail
        fetch('ratesFromMDL.json', {headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            }})
        // fetch('https://www.cbr-xml-daily.ru/latest.js')  // Ссылка на курс по рублю.
        // 'https://api..io/fetch-all?api_key=3d2379881e-77d9707fb4-rvmzr6' платная ссылка
            .then(res => res.json())
            .then((json) => {
                resultsRef.current = json.results;
                onChangeToPrice(1);

            } ).catch(error => {
            console.warn(error);
            alert('Не удалось получить информацию')
        });
    }, [] );

    const onChangeFromPrice = (value) => {  // 1 to 2
        const price = value / resultsRef.current[fromCurrency]; // Если по долару данные
        const result = price * resultsRef.current[toCurrency];
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }
    const onChangeToPrice = (value) => { // 2 to 1
    const result = (resultsRef.current[fromCurrency] / resultsRef.current[toCurrency]) * value;
        setFromPrice(result.toFixed(3))
        setToPrice(value)

    }

    //  UseEffect для обнобления данных при смене валюты в BLOCK 1.
    useEffect(() => {
        onChangeFromPrice(fromPrice);
        },[fromCurrency]);

    //  UseEffect для обнобления данных при смене валюты в BLOCK 2.
    useEffect(() => {
        onChangeToPrice(toPrice);
    },[toCurrency]);


    return (
    <div className="App">

      <Block
            handleClick={isDivVisible}
            keyList={resultsRef}
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={setFromCurrency}
            onChangeValue={onChangeFromPrice}
      />
        <Block
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={setToCurrency}
            onChangeValue={onChangeToPrice}
        />

    </div>
  );
}
export default App;