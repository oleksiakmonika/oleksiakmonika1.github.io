import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {Bar} from 'react-chartjs-2';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        marginTop: '1%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#app')
const Today = () => {
    const [currency, setCurrency] = useState([]);
    const [chartData, setChartData] = useState({});
    let arrName = [];
    let arrCurrency = [];


    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
                        label: 'Kurs podstawowych walut z dziś',
                        data: arrCurrency,
                        backgroundColor: 'rgba(60,79,128,0.2)',
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
        <div className='container3'>
            <div className='row3'>

                <div className='ul'>
                    <ul>
                        {
                            currency.map((e, i) => {
                                return <li className='li'
                                           key={i}>
                                    <div>{e.code} - {e.currency} {e.mid} zł</div>
                                </li>
                            })
                        }
                    </ul>
                </div>

                    <div>
                        <button className='chart3' onClick={openModal}><Bar data={chartData}/></button>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                            <h2 ref={_subtitle => (subtitle = _subtitle)}> </h2>
                            <div className='subtitle'>
                                <button onClick={closeModal}> X</button>
                                <Bar data={chartData}/>
                            </div>
                        </Modal>
                    </div>


            </div>
        </div>
    )
};
export default Today;