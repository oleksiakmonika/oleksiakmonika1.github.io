import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";


const MonthCurrency = () => {
    const [currency, setCurrency] = useState([]);
    const [currency1, setCurrency1] = useState([]);
    const [currency2, setCurrency2] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});

    const chart = () => {
        let arrName = [];
        let arrCurrency = []
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                for (const el of res.rates) {
                    arrName.push(el.effectiveDate);
                    arrCurrency.push(el.mid)
                }
                setChartData({
                    labels: arrName,
                    datasets: [{
                        label: 'USD',
                        data: arrCurrency,
                        backgroundColor: ['rgba(60,79,128,0.2)'],
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };
    const chart1 = () => {
        let arrName = [];
        let arrCurrency = []
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                for (const el of res.rates) {
                    arrName.push(el.effectiveDate);
                    arrCurrency.push(el.mid)
                }
                setChartData1({
                    labels: arrName,
                    datasets: [{
                        label: 'CHF',
                        data: arrCurrency,
                        backgroundColor: ['rgba(60,79,128,0.2)'],
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };
    const chart2 = () => {
        let arrName = [];
        let arrCurrency = []
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                for (const el of res.rates) {
                    arrName.push(el.effectiveDate);
                    arrCurrency.push(el.mid)
                }
                setChartData2({
                    labels: arrName,
                    datasets: [{
                        label: 'EUR',
                        data: arrCurrency,
                        backgroundColor: ['rgba(60,79,128,0.2)'],
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };

    const loadCurrency = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates))
            .catch(error => console.log(error))
    };

    const loadCurrency1 = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency1(res.rates))
            .catch(error => console.log(error))
    };

    const loadCurrency2 = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency2(res.rates))
            .catch(error => console.log(error))
    };

    useEffect(() => {
        loadCurrency2(), loadCurrency1(), loadCurrency(), chart(), chart1(), chart2()
    }, []);

    return (

        <div className='container2'><h2>Średni kurs NBP z 30 dni roboczych</h2>
            <div className='row2'>

                <div className='chart'>

                    <Line data={chartData}/>
                </div>

                <div className='ul'>
                    <ul>
                        {
                            currency.map((e, i) => {
                                return <li className='li'
                                           key={i}>
                                    <div>Dnia {e.effectiveDate}</div>
                                    <div>{e.mid} zł</div>
                                </li>
                            })
                        }
                    </ul>
                </div>

            </div>

            <div className='row2'>

                <div className='chart'>
                    <Line data={chartData1}/>
                </div>

                <div className='ul'>
                    <ul>
                        {
                            currency1.map((e, i) => {
                                return <li className='li'
                                           key={i}>
                                    <div>Dnia {e.effectiveDate}</div>
                                    <div>{e.mid} zł</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='row2'>
                <div className='chart'>
                    <Line data={chartData2}/>
                </div>
                <div className='ul'>
                    <ul>
                        {
                            currency2.map((e, i) => {
                                return <li className='li'
                                           key={i}>
                                    <div>Dnia {e.effectiveDate}</div>
                                    <div>{e.mid} zł</div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default MonthCurrency;