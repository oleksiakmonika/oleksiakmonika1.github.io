import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Bar, Line} from 'react-chartjs-2'
require('../scss/main.scss');
const ChartData = () => {
    const [chartData, setChartData] = useState({});
    const chart = () => {
        setChartData({
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Wartość walut',
                data: [12, 19, 3, 5, 2, 50],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <Bar data={chartData}/>
        </div>
    );
};


const Header = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, []);

    return (
        <div className='header'>
            <div style={{fontSize: '24px'}}> {date.toLocaleDateString()}</div>
            <div style={{fontSize: '24px'}}> {date.toLocaleTimeString()}</div>
        </div>
    )
};

const NbpTodayUsdChfEur = () => {
    const [currency, setCurrency] = useState(' ');
    const [currency1, setCurrency1] = useState(' ');
    const [currency2, setCurrency2] = useState(' ');

    const loadCurrency = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/today/", {
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Wystąpił błąd połączenia!")
                }
            })
            .then(res => setCurrency(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    const loadCurrency1 = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/today/", {
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Wystąpił błąd połączenia!")
                }
            })
            .then(res => setCurrency1(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    const loadCurrency2 = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/today/", {
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Wystąpił błąd połączenia!")
                }
            })
            .then(res => setCurrency2(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    loadCurrency();
    loadCurrency1();
    loadCurrency2();

    return (
        <div className='columns'>
            <div className='usd'>
                <h2 style={{height: "50px", width: "300px", textAlign: 'right'}}>
                    Kurs USD z dziś {currency} {(currency) == null ? "nie został (jeszcze) podany" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>
            </div>
            <div className='chf'>
                <h2 style={{height: "50px", width: "300px", textAlign: 'right'}}>
                    Kurs CHF z dziś {currency1} {(currency1) == null ? "nie został (jeszcze) podany" : "zł"}
                    {/*Kurs CHF z dziś {currency1} zł*/}
                </h2>
            </div>
            <div className='eur'>
                <h2 style={{height: "50px", width: "300px", textAlign: 'right'}}>
                    Kurs EUR z dziś {currency2} {(currency2) == null ? "nie został (jeszcze) podany" : "zł"}
                    {/*Kurs EUR z dziś {currency2} zł*/}
                </h2>
            </div>
        </div>
    );
};


const MonthCurrency = () => {

    const [currency, setCurrency] = useState([]);
    const [currency1, setCurrency1] = useState([]);
    const [currency2, setCurrency2] = useState([]);

    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates))
            .catch(error => console.log(error))
    };

    const loadCurrency1 = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency1(res.rates))
            .catch(error => console.log(error))
    };

    const loadCurrency2 = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency2(res.rates))
            .catch(error => console.log(error))
    };

    useEffect(() => {
        loadCurrency2(), loadCurrency1(), loadCurrency()
    }, []);

    return (
        <div className='columns'>
            <div><h3 className='usd'>Średni kurs NBP z ostatnich 30 dni</h3>

                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='usd' style={{
                                listStyleType: "none", paddingLeft: '10px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.mid} zł </li>
                        })
                    }
                </ul>

            </div>
            <div>
                <h3 className='chf'>Średni kurs NBP z ostatnich 30 dni</h3>

                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='chf' style={{
                                listStyleType: "none", paddingLeft: '10px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.mid} zł </li>
                        })
                    }
                </ul>

            </div>
            <div>
                <h3 className='eur'>Średni kurs NBP z ostatnich 30 dni</h3>

                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='eur' style={{
                                listStyleType: "none", paddingLeft: '10px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.mid} zł</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
};
const Notes = () => {
    function useLocalState(localItem) {
        const [loc, setSate] = useState(localStorage.getItem(localItem));

        function setLoc(newItem) {
            localStorage.setItem(localItem, newItem);
            setSate(newItem)
        }

        return [loc, setLoc]
    }

    const [myText, setMyText] = useLocalState('myText');
    return (

        <form className='form' onSubmit={e => e.preventDefault()}>
            <p>Sporządź notatkę: </p>
            <span>
                <textarea style={{background: 'lightgrey', border: 'none'}} className='textArea'
                          onChange={e => setMyText(e.currentTarget.value)} type='text'
                          value={myText} placeholder='Sporządź notatkę...'/><br/>
                <button style={{background: "dogerblue"}} onClick={e => setMyText(' ')}>Wyczyść notatkę</button>
            </span>

        </form>
    )
}

const NbpToday = () => {
    const [currency, setCurrency] = useState([]);
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/tables/a/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res[0].rates))
            .catch(error => console.log(error))
    };
    useEffect(() => {
        loadCurrency()
    }, []);

    return (
        <div className='today'><h3>Średni kurs walut NBP z dnia dzisiejszego</h3>
            <div className='pairs'>
                <ul>
                    {currency.map((e, i) => {
                        return <li className='all' style={{
                            listStyleType: "none",
                            fontSize: '16px',
                            // textAlign: 'right'
                            // border: '1px solid grey',
                            // height: '50px',
                            // width: "300px"
                        }} key={i}>{e.code} - {e.currency}
                            {/*<button> Sprawdz kurs waluty {e.currency} z ostatnich 10 dni</button>*/}
                        </li>
                    })
                    }
                </ul>
                <ul>
                    {currency.map((e, i) => {
                        return <li className='all' style={{
                            listStyleType: "none",
                            fontSize: '16px',
                            // textAlign: 'right'
                            // border: '1px solid grey',
                            // height: '50px',
                            // width: "300px"
                        }} key={i}>{e.mid} zł
                            {/*<button> Sprawdz kurs waluty {e.currency} z ostatnich 10 dni</button>*/}
                        </li>
                    })
                    }
                </ul>
            </div>
        </div>
    )
};


const Pko = () => {
    const [currency, setCurrency] = useState([]);
    const loadCurrency = () => {
        fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=CHF&range=5&date=14-04-2020", {
            headers: {
                "Origin": "http://localhost:3000"
            }
        })
            .then(res => res.json())
            .then(res => setCurrency(res.data[0]))
            .catch(error => console.log(error))
    };
    useEffect(() => {
        loadCurrency()
    }, []);

    return (
        <div><h3>z PKO BP</h3>

            <h2> {Object.keys(currency)[0]}</h2>
            <ul>
                {Object.keys(currency).map((e, i) => {
                    return <li className='all' style={{
                        listStyleType: "none",
                        fontSize: '16px',
                    }} key={i}> z dnia {currency[e][2][0]}:{currency[e][2][1]}
                    </li>
                })
                }
            </ul>
        </div>
    )
};

const Pko1 = () => {
    fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=USD&range=5&date=14-04-2020", {
        headers: {
            "Origin": "http://localhost:3000"
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log('Dane z API: ', json);
        });
    return (
        <>
            <h1>_________________________________________________________________ </h1>
        </>
    )
};

const App = () => {
    return (<> <Header/><NbpTodayUsdChfEur/><MonthCurrency/><Notes/><NbpToday/>< ChartData/><Pko/><Pko1/></>)
};
ReactDOM.render(<App/>, document.getElementById("app"));

