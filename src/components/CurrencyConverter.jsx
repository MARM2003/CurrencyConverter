import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setfromCurrency] = useState("USD");
    const [tocurrency, setToCurrency] = useState("EUR");
    const [result, setResult] = useState(null);

    const API_URL = "https://v6.exchangerate-api.com/v6/bde4548b5bd846ae9104715f/latest/";

    //fetching all currency
    useEffect(() => {
        fetch(`${API_URL}USD`).then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not okay");
            }
            return res.json();
        }).then((data) => {
            console.log(data);
            if(data && data.conversion_rates){
                setCurrencies(Object.keys(data.conversion_rates))
            }else{
                console.log(data);
                setCurrencies([]);
            }
        }).catch((err) => {
            console.log("Error fetching data:", err)
        })
    }, [])

    //converting currency
    const ConvertCurency = () => {
        fetch(`${API_URL}${fromCurrency}`).then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            return res.json();
        }).then((data) => {
            const rate = data.conversion_rates[tocurrency]
            setResult((amount * rate).toFixed(2));
        }).catch((err) => {
            console.log("Error converting currency:", err)
        })
    }


    return (
        <>
            {/* converter form */}
            <div className="container-md ">
                <h1>Currency Converter</h1>
                <label htmlFor="">Amount</label>
                <p><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></p>
                <p><Button className="success" onClick={ConvertCurency}>Convert</Button></p>
                {<p>{result} {tocurrency}</p>}
                <div className="d-flex flex-row">
                    <div>
                        <p><label htmlFor="">From</label></p>
                        <Form.Select name="" id="" value={fromCurrency} className="me-4 " onChange={(e) => setfromCurrency(e.target.value)}>
                            {currencies.map((cur) => {
                                return(
                                    <option value={cur} key={cur}>
                                    {cur}</option>
                                );
                            })}
                        </Form.Select>
                    </div>
                    <div className="ms-2">
                        <p><label htmlFor="">To</label></p>
                        <Form.Select name="" id="" className="me-4" value={tocurrency}  onChange={(e) => setToCurrency(e.target.value)}>
                            {currencies.map((cur) => {
                                return(
                                    <option value={cur} key={cur}>
                                    {cur}</option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CurrencyConverter;