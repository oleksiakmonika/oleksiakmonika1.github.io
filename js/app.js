import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
require('../scss/main.scss');


// const Pko = () => {
//
//     fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=USD&range=5&date=01-04-2020", {
//         headers : {
//             "Origin": "http://localhost:3000"
//         }
//     })
//         .then(res => res.json())
//         .then(json => {
//             console.log('Dane z API: ', json);
//         });
//     return (
//         <>
//             <h1>json</h1>
//         </>
//     )
// };

const Header = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, []);

    return (
        <>
            <div style={{fontSize:'24px'}}> {date.toLocaleDateString()}**************{date.toLocaleTimeString()}</div>

        </>
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
        <><h3 style={{textAlign:'center'}}>Średni kurs walut z dnia dzisiejszego</h3>
            <ul>
                {currency.map((e, i) => {
                    return <li className='all' style={{
                        listStyleType: "none",
                        fontSize: '16px',
                        textAlign: 'center'
                        // border: '1px solid grey',
                        // height: '50px',
                        // width: "300px"
                    }} key={i}>{e.code} - {e.currency} --> {e.mid} zł
                        {/*<button> Sprawdz kurs waluty {e.currency} z ostatnich 10 dni</button>*/}
                    </li>
                })
                }
            </ul>
        </>
    )
};
const MonthUsd = () => {
    const [currency, setCurrency] = useState([]);
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates))
            .catch(error => console.log(error))
    };
    useEffect(() => {
        loadCurrency()
    }, []);

    return (
        <><h3 className='usd'>Kurs USD z ostatnich 30dni</h3>
            <ul>
                {
                    currency.map((e, i) => {
                        return <li style={{
                            listStyleType: "none"
                        }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
                    })
                }
            </ul>
        </>
    )
};
const MonthEur = () => {
    const [currency, setCurrency] = useState([]);
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates))
            .catch(error => console.log(error))
    };
    useEffect(() => {
        loadCurrency()
    }, []);

    return (
        <><h3>Kurs EUR z ostatnich 30dni</h3>
            <ul>
                {
                    currency.map((e, i) => {
                        return <li className='eur' style={{
                            listStyleType: "none"
                        }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
                    })
                }
            </ul>
        </>
    )
};
const MonthChf = () => {
    const [currency, setCurrency] = useState([]);
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates))
            .catch(error => console.log(error))
    };
    useEffect(() => {
        loadCurrency()
    }, []);

    return (
        <><h3>Kurs CHF z ostatnich 30dni</h3>
            <ul>
                {
                    currency.map((e, i) => {
                        return <li className='chf' style={{
                            listStyleType: "none"
                        }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
                    })
                }
            </ul>
        </>
    )
};
const NbpTodayUsd = () => {
    const [currency, setCurrency] = useState(' ');
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    loadCurrency();
    return (
        <div className='usd'><h2 style={{height:"100px", width:"300px"}}>
            Kurs USD z dnia dzisiejszego {currency} zł
       </h2></div>
    )
};
const NbpTodayChf = () => {
    const [currency, setCurrency] = useState(' ');
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    loadCurrency();
    return (
        <div className='chf'><h2 style={{height:"100px", width:"300px"}}>
            Kurs CHF z dnia dzisiejszego {currency} zł
        </h2></div>
    )
};
const NbpTodayEur = () => {
    const [currency, setCurrency] = useState(' ');
    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    loadCurrency();
    return (
        <div className='eur'><h2 style={{height:"100px", width:"300px"}}>
            Kurs EUR z dnia dzisiejszego {currency} zł
        </h2></div>
    )
};
const App=()=>{
    return(
        <> <Header/><NbpTodayUsd/> <MonthUsd/><NbpTodayChf/> <MonthChf/> <NbpTodayEur/><MonthEur/> <NbpToday/></>
    )
};

ReactDOM.render(<App/>, document.getElementById("app"));