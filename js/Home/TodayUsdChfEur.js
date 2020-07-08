import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const TodayUsdChfEur = () => {
    const [currency, setCurrency] = useState(' ');
    const [currency1, setCurrency1] = useState(' ');
    const [currency2, setCurrency2] = useState(' ');
    const [date, setDate] = useState(new Date());
    // useEffect(() => {
    //     setInterval(() => {
    //         setDate(new Date())
    //     }, 1000)
    // }, []);
    const loadCurrency = () => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/", {
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
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/", {
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

        <div className='container1'>

            <h2 className='header1'> Średni kurs NBP z dnia {date.toLocaleDateString()}</h2>
            <div className='row1'>

                <h2 className='currencyToday'>

                     <div className='usd'>  </div> USD {currency} {currency == null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>


                <h2 className='currencyToday'>

                    <div className='chf'>   </div>CHF {currency1} {currency1 == null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>


                <h2 className='currencyToday'>

                     <div className='eur'></div>EUR {currency2} {currency2 == null ? "- nie podano" : "zł"}
                    {/*Kurs USD z dziś {currency} zł*/}
                </h2>


            </div>
        </div>
    );
};
export default TodayUsdChfEur;