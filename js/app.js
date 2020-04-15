
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

require('../scss/main.scss');

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
            <ul>
                {Object.keys(currency).map((e, i) => {
                    return <li className='all' style={{
                        listStyleType: "none",
                        fontSize: '16px',
                    }} key={i}> {e} z dnia {currency[e][2][0] }:{currency[e][2][1]}
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
            <ul>
                {currency.map((e, i) => {
                    return <li className='all' style={{
                        listStyleType: "none",
                        fontSize: '16px',
                        // textAlign: 'center'
                        // border: '1px solid grey',
                        // height: '50px',
                        // width: "300px"
                    }} key={i}>{e.code} - {e.currency} --> {e.mid} zł
                        {/*<button> Sprawdz kurs waluty {e.currency} z ostatnich 10 dni</button>*/}
                    </li>
                })
                }
            </ul>
        </div>
    )
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
            <div><h3 className='usd'>Kurs z ostatnich 30 dni</h3>
                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='usd' style={{
                                listStyleType: "none"
                            }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <h3 className='chf'>Kurs z ostatnich 30 dni</h3>
                <ul>
                    {
                        currency2.map((e, i) => {
                            return <li className='chf' style={{
                                listStyleType: "none"
                            }} key={i}>Z dnia {e.effectiveDate} --- -- > {e.mid} zł </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <h3 className='eur'>Kurs z ostatnich 30 dni</h3>
                <ul>
                    {
                        currency1.map((e, i) => {
                            return <li className='eur' style={{
                                listStyleType: "none"
                            }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

const NbpTodayUsdChfEur = () => {
    const [currency, setCurrency] = useState(' ');
    const [currency1, setCurrency1] = useState(' ');
    const [currency2, setCurrency2] = useState(' ');

    const loadCurrency = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    const loadCurrency1 = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency1(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    const loadCurrency2 = () => {
        fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/today/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency2(res.rates[0].mid))
            .catch(error => console.log(error))
    };

    loadCurrency();
    loadCurrency1();
    loadCurrency2();

    return (
        <div className='columns'>
            <div className='usd'>
                <h2 style={{height: "50px", width: "300px"}}>
                    Kurs USD z dziś {currency} zł
                </h2>
            </div>
            <div className='chf'>
                <h2 style={{height: "50px", width: "300px"}}>
                    Kurs CHF z dziś {currency1} zł
                </h2>
            </div>
            <div className='eur'>
                <h2 style={{height: "50px", width: "300px"}}>
                    Kurs EUR z dziś {currency2} zł
                </h2>
            </div>
        </div>
    );
};
const Notes = () => {
function useLocalState(localItem){
    const [loc, setSate]=useState(localStorage.getItem(localItem));
    function  setLoc(newItem) {
        localStorage.setItem(localItem, newItem);
        setSate(newItem)
    }
    return[loc,setLoc]
}
    const [myText, setMyText] = useLocalState('myText');
    return (
        <form onSubmit={e => e.preventDefault()}>

            <span>
                <textarea className='textArea' onChange={e => setMyText(e.currentTarget.value)} type='text'
                          value={myText} placeholder='Sporządź notatkę...'/><br/>
                <button style={{background: "dogerblue"}} onClick={e => setMyText(' ')}>Wyczyść notatkę</button>
            </span>

        </form>
    )
}

const App = () => {
    return (
        <> <Header/><NbpTodayUsdChfEur/><MonthCurrency/><Notes/><NbpToday/><Pko/><Pko1/></>
    )
};
ReactDOM.render(<App/>, document.getElementById("app"));


// import React, {useEffect, useState} from "react";
// import ReactDOM from "react-dom";
//
// require('../scss/main.scss');
//
//
// // const Pko = () => {
// //
// //     fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=USD&range=5&date=01-04-2020", {
// //         headers : {
// //             "Origin": "http://localhost:3000"
// //         }
// //     })
// //         .then(res => res.json())
// //         .then(json => {
// //             console.log('Dane z API: ', json);
// //         });
// //     return (
// //         <>
// //             <h1>json</h1>
// //         </>
// //     )
// // };
//
// const Header = () => {
//     const [date, setDate] = useState(new Date());
//
//     useEffect(() => {
//         setInterval(() => {
//             setDate(new Date())
//         }, 1000)
//     }, []);
//
//     return (
//         <>
//             <div style={{fontSize: '24px'}}> {date.toLocaleDateString()}**************{date.toLocaleTimeString()}</div>
//         </>
//     )
// };
// const NbpToday = () => {
//     const [currency, setCurrency] = useState([]);
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/tables/a/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res[0].rates))
//             .catch(error => console.log(error))
//     };
//     useEffect(() => {
//         loadCurrency()
//     }, []);
//
//     return (
//         <><h3 style={{textAlign: 'center'}}>Średni kurs walut z dnia dzisiejszego</h3>
//             <ul>
//                 {currency.map((e, i) => {
//                     return <li className='all' style={{
//                         listStyleType: "none",
//                         fontSize: '16px',
//                         textAlign: 'center'
//                         // border: '1px solid grey',
//                         // height: '50px',
//                         // width: "300px"
//                     }} key={i}>{e.code} - {e.currency} --> {e.mid} zł
//                         {/*<button> Sprawdz kurs waluty {e.currency} z ostatnich 10 dni</button>*/}
//                     </li>
//                 })
//                 }
//             </ul>
//         </>
//     )
// };
// const MonthUsd = () => {
//     const [currency, setCurrency] = useState([]);
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates))
//             .catch(error => console.log(error))
//     };
//     useEffect(() => {
//         loadCurrency()
//     }, []);
//     return (
//         <><h3 className='usd'>Kurs USD z ostatnich 30dni</h3>
//             <ul>
//                 {
//                     currency.map((e, i) => {
//                         return <li style={{
//                             listStyleType: "none"
//                         }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
//                     })
//                 }
//             </ul>
//         </>
//     )
// };
// const MonthEur = () => {
//     const [currency, setCurrency] = useState([]);
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates))
//             .catch(error => console.log(error))
//     };
//     useEffect(() => {
//         loadCurrency()
//     }, []);
//
//     return (
//         <><h3>Kurs EUR z ostatnich 30dni</h3>
//             <ul>
//                 {
//                     currency.map((e, i) => {
//                         return <li className='eur' style={{
//                             listStyleType: "none"
//                         }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
//                     })
//                 }
//             </ul>
//         </>
//     )
// };
// const MonthChf = () => {
//     const [currency, setCurrency] = useState([]);
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates))
//             .catch(error => console.log(error))
//     };
//     useEffect(() => {
//         loadCurrency()
//     }, []);
//
//     return (
//         <><h3>Kurs CHF z ostatnich 30dni</h3>
//             <ul>
//                 {
//                     currency.map((e, i) => {
//                         return <li className='chf' style={{
//                             listStyleType: "none"
//                         }} key={i}>Z dnia {e.effectiveDate} ---> {e.mid} zł </li>
//                     })
//                 }
//             </ul>
//         </>
//     )
// };
// const NbpTodayUsd = () => {
//     const [currency, setCurrency] = useState(' ');
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/usd/today/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates[0].mid))
//             .catch(error => console.log(error))
//     };
//
//     loadCurrency();
//     return (
//         <div className='usd'><h2 style={{height: "100px", width: "300px"}}>
//             Kurs USD z dnia dzisiejszego {currency} zł
//         </h2></div>
//     )
// };
// const NbpTodayChf = () => {
//     const [currency, setCurrency] = useState(' ');
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/chf/today/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates[0].mid))
//             .catch(error => console.log(error))
//     };
//
//     loadCurrency();
//     return (
//         <div className='chf'><h2 style={{height: "100px", width: "300px"}}>
//             Kurs CHF z dnia dzisiejszego {currency} zł
//         </h2></div>
//     )
// };
// const NbpTodayEur = () => {
//     const [currency, setCurrency] = useState(' ');
//     const loadCurrency = () => {
//         fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/today/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.rates[0].mid))
//             .catch(error => console.log(error))
//     };
//
//     loadCurrency();
//     return (
//         <div className='eur'><h2 style={{height: "100px", width: "300px"}}>
//             Kurs EUR z dnia dzisiejszego {currency} zł
//         </h2></div>
//     )
// };
// const App = () => {
//     return (
//         <> <Header/><NbpTodayUsd/> <MonthUsd/><NbpTodayChf/> <MonthChf/> <NbpTodayEur/><MonthEur/> <NbpToday/></>
//     )
// };
// ReactDOM.render(<App/>, document.getElementById("app"));