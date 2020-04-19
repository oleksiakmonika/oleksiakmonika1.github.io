import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Bar, Line} from 'react-chartjs-2'
require('../scss/main.scss');



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
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/", {
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

                <h2 style={{ width: "400px", marginLeft:'100px'}}>
                    Kurs USD z dziś {currency} {currency !== null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>


            </div>
            <div className='chf'>
                <h2 style={{ width: "400px", marginLeft:'100px'}}>
                    Kurs CHF z dziś {currency} {currency !== null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>

            </div>
            <div className='eur'>
                <h2 style={{ width: "400px", marginLeft:'100px'}}>
                    Kurs EUR z dziś {currency} {currency !== null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>

            </div>
        </div>
    );
};

const MonthCurrency = () => {
    const [currency, setCurrency] = useState([]);
    const [currency1, setCurrency1] = useState([]);
    const [currency2, setCurrency2] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});
    let arrName = [];
    let arrCurrency = []
    const chart = () => {

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
                        label: 'Zmiana kursu USD w ostatnich 30 dniach roboczych',
                        data: arrCurrency,
                        backgroundColor: ['rgba(80,150,217,0.2)'],
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };
    const chart1 = () => {

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
                        label: 'Zmiana kursu CHF w ostatnich 30 dniach roboczych',
                        data: arrCurrency,
                        backgroundColor: ['rgba(80,150,217,0.2)'],
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };
    const chart2 = () => {
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
                        label: 'Zmiana kursu Eur w ostatnich 30 dniach roboczych',
                        data: arrCurrency,
                        backgroundColor: ['rgba(80,150,217,0.2)'],
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
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency1(res.rates))
            .catch(error => console.log(error))
    };

    const loadCurrency2 = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/", {
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
        <div className='columns' >
            <div><h2 style={{ marginLeft:'70px'}} className='usd'>Średni kurs NBP z ostatnich 30 dni</h2>
                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='usd' style={{
                                listStyleType: "none", paddingLeft: '30px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{e.mid} zł </li>
                        })
                    }
                </ul>
                <div style={{background:'lightgrey', margin:'50px', padding:'20px', marginLeft:'80px'}}>
                    <Line data={chartData}/>
                </div>
            </div>
            <div>
                <h2  style={{ marginLeft:'70px'}} className='chf'>Średni kurs NBP z ostatnich 30 dni</h2>

                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='chf' style={{
                                listStyleType: "none", paddingLeft: '20px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.mid} zł </li>
                        })
                    }
                </ul>
                <div style={{background:'lightgrey', margin:'50px', padding:'20px', marginLeft:'80px'}}>
                    <Line data={chartData1}/>
                </div>
            </div>
            <div>
                <h2 style={{ marginLeft:'70px'}}  className='eur'>Średni kurs NBP z ostatnich 30 dni</h2>

                <ul>
                    {
                        currency.map((e, i) => {
                            return <li className='eur' style={{
                                listStyleType: "none", paddingLeft: '20px'
                            }}
                                       key={i}>Dnia {e.effectiveDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.mid} zł</li>
                        })
                    }
                </ul>
                <div style={{background:'lightgrey', margin:'50px', padding:'20px', marginLeft:'80px'}}>
                    <Line data={chartData2}/>
                </div>
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
                <textarea style={{background: 'rgba(211, 211, 211, 0.09)', border: 'none'}} className='textArea'
                          onChange={e => setMyText(e.currentTarget.value)} type='text'
                          value={myText} placeholder='Sporządź notatkę...'/><br/>
                <button style={{background: "dogerblue"}} onClick={e => setMyText(' ')}>Wyczyść notatkę</button>
            </span>

        </form>
    )
}
const NbpToday = () => {
    const [currency, setCurrency] = useState([]);
    const [chartData, setChartData] = useState({});
    let arrName = [];
    let arrCurrency = [];
    const loadCurrency = () => {
        fetch("https://api.nbp.pl/api/exchangerates/tables/a/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => setCurrency(res[0].rates))
            .catch(error => console.log(error))
    };
    const chart = () => {

        fetch("https://api.nbp.pl/api/exchangerates/tables/a/", {
            method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                for (const el of res[0].rates) {
                    arrName.push(el.code);
                    arrCurrency.push(el.mid)
                }
                setChartData({
                    labels: arrName,
                    datasets: [{
                        label: 'Aktualnie obowiązujący kurs walut obcych',
                        data: arrCurrency,
                        backgroundColor: 'rgba(80,150,217,0.2)',
                        borderWidth: 1
                    }]
                })
            })
            .catch(error => console.log(error))
    };
    useEffect(() => {
       loadCurrency(), chart()
    }, []);

    return (
        <div className='today'><h2 style={{padding:'20px', textAlign:'center'}}>Aktualnie obowiązujący kurs średni walut</h2>
            <div className='columns'>
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
            <div className='wykres' style={{background:'lightgrey', margin:'50px', padding:'20px', marginLeft:'80px', height:'250px', width:'500px',marginTop:'200px'}}>
                <Bar data={chartData}/>
            </div>
                </div>
        </div>
    )
};

//
// const Pko = () => {
//     const [currency, setCurrency] = useState([]);
//     const loadCurrency = () => {
//         fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=CHF&range=5&date=14-04-2020", {
//             headers: {
//                 "Origin": "http://localhost:3000"
//             }
//         })
//             .then(res => res.json())
//             .then(res => setCurrency(res.data[0]))
//             .catch(error => console.log(error))
//     };
//     useEffect(() => {
//         loadCurrency()
//     }, []);
//
//     return (
//         <div><h3>dane z PKO BP</h3>
//
//             <h2> {Object.keys(currency)[0]}</h2>
//             <ul>
//                 {Object.keys(currency).map((e, i) => {
//                     return <li className='all' style={{
//                         listStyleType: "none",
//                         fontSize: '16px',
//                     }} key={i}> z dnia {currency[e][2][0]}:{currency[e][2][1]}
//                     </li>
//                 })
//                 }
//             </ul>
//         </div>
//     )
// };
//
// const Pko1 = () => {
//     fetch("https://cors-anywhere.herokuapp.com/https://www.pkobp.pl/waluty/?chart_data&code=USD&range=5&date=14-04-2020", {
//         headers: {
//             "Origin": "http://localhost:3000"
//         }
//     })
//         .then(res => res.json())
//         .then(json => {
//             console.log('Dane z API: ', json);
//         });
//     return (
//         <>
//             <h1>.</h1>
//         </>
//     )
// };
// const ChartData = () => {
//     const [chartData, setChartData] = useState({});
//     const chart = () => {
//         setChartData({
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: 'Wartość walut',
//                 data: [12, 19, 3, 5, 2, 50],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         })
//     }
//     useEffect(() => {
//         chart()
//     }, [])
//
//     return (
//         <div>
//             <Bar data={chartData}/>
//         </div>
//     );
// };


// const ChartDataUSD = () => {
//     const [chartData, setChartData] = useState({});
//     let arrName = [];
//     let arrCurrency = []
//     const chart = () => {
//
//         fetch("https://api.nbp.pl/api/exchangerates/tables/a/", {
//             method: "GET"
//         })
//             .then(res => res.json())
//             .then(res => {
//                 for (const el of res[0].rates) {
//                     arrName.push(el.code);
//                     arrCurrency.push(el.mid)
//                 }
//                 setChartData({
//                     labels: arrName,
//                     datasets: [{
//                         label: 'Aktualnie obowiązujący kurs walut obcych',
//                         data: arrCurrency,
//                         backgroundColor: 'rgba(80,150,217,0.2)',
//                         borderWidth: 1
//                     }]
//                 })
//             })
//             .catch(error => console.log(error))
//     };
//     console.log(arrName,arrCurrency);
//     // setChartData({
//     //     labels: arrName,
//     //     datasets: [{
//     //         label: 'Wartość walut',
//     //         data: arrCurrency,
//     //         backgroundColor: ['rgba(255, 99, 132, 0.2)'],
//     //         borderWidth: 1
//     //     }]
//     // })
//     useEffect(() => {
//         chart()
//     }, []);
//     return (
//         <div>
//             <Bar data={chartData}/>
//         </div>
//     )
// };
const Footer = () => {

    return (
        <div className='footer'>
            <footer> &copy; Monika Oleksiak</footer>
            <footer style={{fontSize:'10px'}}> Dane pobrane z https://api.nbp.pl/</footer>
        </div>
    )
};
const App = () => {
    return (<> <Header/><NbpTodayUsdChfEur/><MonthCurrency/><Notes/><NbpToday/><Footer/></>)
};
ReactDOM.render(<App/>, document.getElementById("app"));

