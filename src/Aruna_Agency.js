import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function Aruna_Agency() {
    const [formData, setFormData] = useState({
        advanceValue: '',
        number: '',
        airNumber: '',
        gressDetails: '',
        gressValue: '',
        gressName: '',
        gressNo: '',
        extraName:'',
        extraValue:'',
        ringRoadName: '',
        ringRoad: '',
        addBlueLevel: '',
        addBlueOil: '',
        message: ''
    });
    const [scope, setScope] = useState([0]);
    const [advance, setGrandTotal] = useState([0]);
    const [showAnotherTime, setShowAnotherTime] = useState(false);
    const [anotherTotal, setAnotherTotal] = useState([0]);
    const [overall, setOverAll] = useState([0]);
    const [final, setFinal] = useState([0]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        var overall = scope - formData.advanceValue;

        setOverAll(overall);

    };

    const itemsCalculate = () => {

        setGrandTotal(advance);
        var scope =
            Number(formData.number) +
            Number(formData.airNumber) +
            Number(formData.gressValue) +
            Number(formData.gressNo)+
            Number(formData.extraValue)+
            Number(formData.ringRoad);
        console.log(scope);

        setScope(scope);

        // setFormData({advanceValue:''})
        // setTotalCalculate(true);
    };
    const addtoAmount = () => {
        setShowAnotherTime(true);
    };
    const addtoAnotherAmount = () => {

        var anotherTotal =
            Number(formData.addBlueOil) -
            Number(formData.anotherTimeAdvanceValue);
        console.log(anotherTotal);

        setAnotherTotal(anotherTotal);

        var final = anotherTotal + overall;
        console.log(final);
        setFinal(final);

        // Create Api

        let data = {
            advanceAmount: Number(formData.advanceValue),
            samyRupees: Number(formData.number),
            airWaste: Number(formData.airNumber),
            gressCount: formData.gressDetails,
            gressAmount: Number(formData.gressValue),
            addBlueOil: formData.ringRoadName,
            addBlueOilAmount: Number(formData.ringRoad),
            anotherTimeGressName:formData.gressName,
            anotherTimeValue: Number(formData.gressNo),
            extraName:formData.extraName,
            extraValue:Number(formData.extraValue),
            total: scope,
            grandTotal: overall,
            anotherTimeAdvance: Number(formData.anotherTimeAdvanceValue),
            sencondAddBlueOil: formData.addBlueLevel,
            sencondOilAmount: Number(formData.addBlueOil),
            secondTotal: anotherTotal,
            finalTotal: final
        }
        axios.post('/createConnect/add', data)
            .then(response => {
                console.log("<=== Create Api ===>", response.data);
                setShowAnotherTime(false);
                toast.success("Report Send to Mail !", {
                    position: "top-right",
                });

            })
            .catch(error => {
                console.log("Failed");
                toast.error("Failed to send report!", {
                    position: "top-right",
                });

            });
    };


    return (
        <div style={styles.wrapper}>
            {/* <button onClick={notify}>Notify!</button> */}

            <div style={styles.container}>
                <h2 style={styles.header}>Sri Aruna Agency</h2>
                <hr />
                {/* <h4 className="paymentStyle"> Advance : 5000</h4> */}
                <div className="text-center">
                    <label htmlFor="number" style={{ fontSize: '21px', fontWeight: '500' }}>Advance : </label>
                    <input type="number"
                        name="advanceValue"
                        value={formData.advanceValue}
                        onChange={handleChange}
                        required style={styles.row} />
                </div>

                <br></br>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div className="row" style={styles.row}>
                        <div className="col-4">
                            <label htmlFor="number">Samy Rupees</label>
                        </div>
                        <div className='col-5'>
                            <span className="colonStyle">:</span>
                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="number"
                                id="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div className="row" style={styles.row}>
                        <div className="col-4">
                            <label htmlFor="airNumber">Air Waste</label>
                        </div>
                        <div className="col-5">

                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="airNumber"
                                id="airNumber"
                                value={formData.airNumber}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div className="row" style={styles.row}>
                        <div className="col-3">
                            <label htmlFor="gressValue">Gress</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="name"
                                name="gressDetails"
                                id="gressDetails"
                                value={formData.gressDetails}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="col-1">
                            :
                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="gressValue"
                                id="gressValue"
                                value={formData.gressValue}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div className="row" style={styles.row}>
                        <div className="col-3">
                            <label htmlFor="ringRoad">Another Time Gress</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="name"
                                name="gressName"
                                id="gressName"
                                value={formData.gressName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="col-1">
                            :
                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="gressNo"
                                id="gressNo"
                                value={formData.gressNo}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>
                    
                    <div className="row" style={styles.row}>
                        <div className="col-3">
                            <label htmlFor="ringRoad">Add Blue Oil</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="name"
                                name="ringRoadName"
                                id="ringRoadName"
                                value={formData.ringRoadName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="col-1">
                            :
                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="ringRoad"
                                id="ringRoad"
                                value={formData.ringRoad}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>


                    <div className="row" style={styles.row}>
                        <div className="col-3">
                            <label htmlFor="ringRoad">Extra Modification</label>
                        </div>
                        <div className="col-5">
                            <input
                                type="name"
                                name="extraName"
                                id="extraName"
                                value={formData.extraName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div className="col-1">
                            :
                        </div>
                        <div className="col-3">
                            <input
                                type="number"
                                name="extraValue"
                                id="extraValue"
                                value={formData.extraValue}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>
                    {/* <div className="row" style={styles.row}>
                        <div className="col-3">
                            <label htmlFor="message">Message</label>
                        </div>
                        <div className="col-9">
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                style={styles.textarea}
                            ></textarea>
                        </div>
                    </div> */}

                    <hr></hr>
                    <div className="row" style={styles.row}>
                        <div className="col-4">
                            <label htmlFor="number">Total</label>
                        </div>
                        <div className='col-5'>
                            <span className="colonStyle">:</span>
                        </div>
                        <div className="col-3">
                            {scope}
                        </div>
                    </div>

                    <div className="row" style={styles.row}>
                        <div className="col-4">
                            <label htmlFor="number">Advance Amount</label>
                        </div>
                        <div className='col-5'>
                            <span className="colonStyle">:</span>
                        </div>
                        <div className="col-3">
                            {formData.advanceValue}
                        </div>
                    </div>
                    <hr></hr>

                    <div className="row" style={styles.row}>
                        <div className="col-4">
                            <label htmlFor="number">Grand Total</label>
                        </div>
                        <div className='col-5'>
                            <span className="colonStyle">:</span>
                        </div>
                        <div className="col-3">
                            {overall}
                        </div>
                    </div>
                    <hr></hr>

                    <div className="row">

                        <div className="col-12 text-center">
                            <button onClick={itemsCalculate} style={styles.button}>Calculate</button>
                        </div>
                    </div>
                    <br></br>
                    {/* //------------------Another Time------------------ */}
                    <div className="row">

                        <div className="col-12 text-center">
                            <button onClick={addtoAmount} style={styles.button1}>Add</button>
                        </div>
                    </div>

                    {showAnotherTime && (
                        <div>
                            <div className="text-center">
                                <label htmlFor="anotherTimeAdvanceValue" style={{ fontSize: '21px', fontWeight: '500' }}>Another Time Advance : </label>
                                <input
                                    type="number"
                                    name="anotherTimeAdvanceValue"
                                    value={formData.anotherTimeAdvanceValue}
                                    onChange={handleChange}
                                    style={styles.row}
                                />
                            </div>

                            <div className="row" style={styles.row}>
                                <div className="col-3">
                                    <label htmlFor="addBlueOil">Add Blue Oil</label>
                                </div>
                                <div className="col-5">
                                    <input
                                        type="name"
                                        name="addBlueLevel"
                                        id="addBlueLevel"
                                        value={formData.addBlueLevel}
                                        onChange={handleChange}
                                        style={styles.input}
                                    />
                                </div>
                                <div className="col-1">:</div>
                                <div className="col-3">
                                    <input
                                        type="number"
                                        name="addBlueOil"
                                        id="addBlueOil"
                                        value={formData.addBlueOil}
                                        onChange={handleChange}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row" style={styles.row}>
                                <div className="col-4">
                                    <label htmlFor="number">Total</label>
                                </div>
                                <div className='col-5'>
                                    <span className="colonStyle">:</span>
                                </div>
                                <div className="col-3">
                                    {anotherTotal}
                                </div>
                            </div>
                            <div className="row" style={styles.row}>
                                <div className="col-4">
                                    <label htmlFor="number">Grand Total</label>
                                </div>
                                <div className='col-5'>
                                    <span className="colonStyle">:</span>
                                </div>
                                <div className="col-3">
                                    {overall}
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row" style={styles.row}>
                                <div className="col-4">
                                    <label htmlFor="number">Final Total</label>
                                </div>
                                <div className='col-5'>
                                    <span className="colonStyle">:</span>
                                </div>
                                <div className="col-3">
                                    {final}
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-12 text-center">
                                    <ToastContainer />
                                    <button onClick={addtoAnotherAmount} style={styles.button1}>Another Time Amount</button>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* ***************-----******************----************* */}



                </form>


            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1583657617216-2b957187f766?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '600px',
        margin: '60px auto',
        padding: '20px',
        border: '1px solid rgb(44 215 160)',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'fantacy',
        backgroundColor: 'white'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px'
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    },
    button1: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: 'blue',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    }
};

export default Aruna_Agency;

