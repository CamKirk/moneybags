import React, { Component } from 'react';
import '../../App.css';
import './UserDashboard.css';
import '../../react-vis.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis/dist';
import regression from 'regression';
import OneYear from './OneYear';
import FiveYears from './FiveYears';
import TenYears from './TenYears';
import TwentyYears from './TwentyYears';
import LoanCalculator from './LoanCalculator';
import { Button } from 'reactstrap';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';

const ITEMS = [
    { title: 'Current Cash Flow', color: 'green' },
    { title: 'Current Cash Flow Trend', color: 'blue' },
    { title: 'Trend w/Optional Purchase', color: 'red' }
];
export default class CashFlow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regressionEquation: '',
            regressionEquation2: '',
            regressionEquation3: '',
            regLineData: [],
            regLineData2: [],
            dataSet: [],
            dataSet2: [],
            selectedTimeScaleInMonths: 1,
            compare: false,
            monthlyPaymentAmount: 400,
            purchaseData: '',
            sampleBalance: 2085
        };

        this.calculate = this.calculate.bind(this);
        this.calculatePurchaseOverInterval = this.calculatePurchaseOverInterval.bind(this);
        this.timeScaleHandler = this.timeScaleHandler.bind(this);

    }
    componentDidMount() {
        // axios.post('/api/addCashFlow', {cashFlow: 'cash flow string'})
        //     .then((data) => {
        //         console.log(data);
        //         // send 'positive', 'negative', or 'neutral'
        //     });

        // fetch("/api/transactions", {
        //     method: "POST"
        //   })
        //     .then(data => data.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.log(err.message));
        //   console.log("transaction");
        console.log(this.state.sampleBalance);
        let sampleTransactions = [
            { amount: 17, date: '2018-06-15' },
            { amount: 57, date: '2018-06-17' },
            { amount: 100, date: '2018-06-19' },
            { amount: 23, date: '2018-06-21' },
            { amount: -800, date: '2018-06-24' },
            { amount: 8, date: '2018-06-26' },
            { amount: 15, date: '2018-06-28' },
            { amount: 75, date: '2018-06-30' },
            { amount: 11, date: '2018-07-02' },
            { amount: 6, date: '2018-07-04' },
            { amount: 12, date: '2018-07-08' }
        ];

        let dataSet = [];
        let regressionSet = [];
        let xPointCoord;
        let yPointCoord = this.state.sampleBalance;
        for (let i = sampleTransactions.length - 1; i >= 0; i--) {
            xPointCoord = 30 - Math.round((Date.now() - new Date(sampleTransactions[i].date)) / 86400000);
            yPointCoord += sampleTransactions[i].amount;
            dataSet.push({ x: xPointCoord, y: yPointCoord });
            regressionSet.push([xPointCoord, yPointCoord]);
        }
        dataSet.reverse().push({ x: 30, y: this.state.sampleBalance });
        regressionSet.push([30, this.state.sampleBalance]);

        const result = regression.linear(regressionSet);

        const regLineData = [{ x: 0, y: result.equation[1] },
        { x: 30, y: 30 * result.equation[0] + result.equation[1] }];

        const currentState = this.state;
        currentState.regressionEquation = result;
        currentState.regLineData = regLineData;
        currentState.dataSet = dataSet;
        this.setState({ currentState });
        let cashFlow;
        if (result.equation[0] >= 0) {
            cashFlow = 'positive';
        } else {
            cashFlow = 'negative';
        }
        console.log(result.equation[0]);
        fetch("/api/addCashFlow", {
            method: "POST",
            body: { email: localStorage.getItem('user_email'), cashFlow }

        })
            .then(res => console.log(res))
            .catch(err => console.log(err.message));
        console.log("transaction");
    }

    calculate() {
        console.log('calculate function ran');
        let sampleTransactions = [
            { amount: 17, date: '2018-06-15' },
            { amount: 57, date: '2018-06-17' },
            { amount: 100, date: '2018-06-19' },
            { amount: 23, date: '2018-06-21' },
            { amount: -800, date: '2018-06-24' },
            { amount: 8, date: '2018-06-26' },
            { amount: 15, date: '2018-06-28' },
            { amount: 75, date: '2018-06-30' },
            { amount: 11, date: '2018-07-02' },
            { amount: 6, date: '2018-07-04' },
            { amount: 12, date: '2018-07-08' }
        ];
        const crntState = this.state;
        crntState.sampleBalance = (crntState.sampleBalance - crntState.purchaseData.monthlyPayment - crntState.purchaseData.downPayment);
        this.setState({ crntState });
        sampleTransactions.push({ amount: this.state.purchaseData.monthlyPayment + this.state.purchaseData.downPayment, date: Date.now() });
        let dataSet = [];
        let regressionSet = [];
        let xPointCoord;
        let yPointCoord = this.state.sampleBalance;
        for (let i = sampleTransactions.length - 1; i >= 0; i--) {
            xPointCoord = 30 - Math.round((Date.now() - new Date(sampleTransactions[i].date)) / 86400000);
            yPointCoord += sampleTransactions[i].amount;
            dataSet.push({ x: xPointCoord, y: yPointCoord });
            regressionSet.push([xPointCoord, yPointCoord]);
        }
        dataSet.reverse().push({ x: 30, y: this.state.sampleBalance });
        regressionSet.push([30, this.state.sampleBalance]);

        const result = regression.linear(regressionSet);

        const regLineData2 = [{ x: 0, y: result.equation[1] },
        { x: 30, y: 30 * result.equation[0] + result.equation[1] }];

        const currentState = this.state;
        currentState.regressionEquation2 = result;
        currentState.regLineData2 = regLineData2;
        currentState.dataSet2 = dataSet;
        currentState.compare = true;
        this.setState({ currentState });
    }

    calculatePurchaseOverInterval() {
        console.log('calculate purchase over interval ran');
        console.log('number of payments in months', this.state.purchaseData.loanTerm);
        console.log('selected time scale in months', this.state.selectedTimeScaleInMonths);
        console.log('regression equation number 1', this.state.regressionEquation);
        console.log('regression equation number 2', this.state.regressionEquation2);
        const m_c1 = this.state.regressionEquation.equation;
        const m_c2 = this.state.regressionEquation2.equation;
        const intervalWithoutPayments = this.state.selectedTimeScaleInMonths - this.state.purchaseData.loanTerm;
        let weightedFactor1 = intervalWithoutPayments / this.state.purchaseData.loanTerm;
        let weightedFactor2 = this.state.purchaseData.loanTerm / intervalWithoutPayments;
        if (intervalWithoutPayments <= 0) {
            console.log('interval without payments ran');
            weightedFactor1 = 1;
            weightedFactor2 = 1;
        }
        const slopeProduct1 = weightedFactor1 * m_c1[0];
        const constProduct1 = weightedFactor1 * m_c1[1];
        const slopeProduct2 = weightedFactor2 * m_c2[0];
        const constProduct2 = weightedFactor2 * m_c2[1];
        const newSlope = (slopeProduct1 + slopeProduct2) / 2;
        const newConst = (constProduct1 + constProduct2) / 2;
        const regressionEquation3 = [newSlope, newConst];
        const currentState = this.state;
        currentState.regressionEquation3 = regressionEquation3;
        this.setState({ currentState });
    }

    timeScaleHandler(e) {
        console.log('the time scale handler ran');
        const currentState = this.state;
        switch (e.target.name) {
            case 'one-year':
                currentState.selectedTimeScaleInMonths = 12;
                break;
            case 'five-years':
                currentState.selectedTimeScaleInMonths = 60;
                break;
            case 'ten-years':
                currentState.selectedTimeScaleInMonths = 120;
                break;
            case 'twenty-years':
                currentState.selectedTimeScaleInMonths = 240;
                break;
            default:
                currentState.selectedTimeScaleInMonths = 1;
        }
        this.setState({ currentState });
        if (this.state.compare) {
            console.log('calculate purchase over interval ran');
            this.calculatePurchaseOverInterval();
        }
    }

    getPurchaseData(data) {
        const currentState = this.state;
        currentState.purchaseData = data;
        currentState.compare = true;
        console.log(data);
        this.setState({
            currentState
        });
    }

    render() {
        console.log(this.state.regressionEquation3);
        let compare = '';
        if (this.state.purchaseData.submit) {
            compare = <Button color="info" className="cashFlowBtn" onClick={this.calculate}>Compare</Button>;
        }
        switch (this.state.selectedTimeScaleInMonths) {
            case 1:
                return (
                    <div>
                        <div className="cashFlow-btn-group">
                            {compare}
                            <Button color="info" disabled={true} className="cashFlowBtn" onClick={this.timeScaleHandler}>30 Days</Button>
                            <Button color="info" className="cashFlowBtn" name="one-year" onClick={this.timeScaleHandler}>1 Year</Button>
                            <Button color="info" className="cashFlowBtn" name="five-years" onClick={this.timeScaleHandler}>5 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="ten-years" onClick={this.timeScaleHandler}>10 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="twenty-years" onClick={this.timeScaleHandler}>20 Years</Button>
                        </div>
                        <div className="graph-input-group">
                            <div className="cashFlow-graph">
                                <XYPlot
                                    margin={{ left: 60 }}
                                    width={500}
                                    height={500}
                                    xDomain={[0, 30]}
                                >
                                    <HorizontalGridLines />
                                    <VerticalGridLines />
                                    <XAxis
                                        title="Days"
                                        position="start"
                                        tickTotal={6}
                                    />
                                    <YAxis title="Dollars" />
                                    <LineSeries
                                        color="green"
                                        data={this.state.dataSet} />
                                    <LineSeries
                                        strokeStyle="dashed"
                                        data={this.state.regLineData}
                                        color="blue"
                                    />
                                    <LineSeries
                                        strokeStyle="dashed"
                                        data={this.state.regLineData2}
                                        color="red"
                                    />
                                </XYPlot>
                                <DiscreteColorLegend
                                    height={200}
                                    width={300}
                                    items={ITEMS}
                                />
                            </div>
                            <div className="testForm">
                                <LoanCalculator purchaseData={this.getPurchaseData.bind(this)} />
                            </div>
                        </div>
                    </div >
                );
            case 12:
                return (
                    <div>
                        <div className="cashFlow-btn-group">
                            <Button color="info" className="cashFlowBtn" onClick={this.timeScaleHandler}>30 Days</Button>
                            <Button disabled={true} color="info" className="cashFlowBtn" name="one-year" onClick={this.timeScaleHandler}>1 Year</Button>
                            <Button color="info" className="cashFlowBtn" name="five-years" onClick={this.timeScaleHandler}>5 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="ten-years" onClick={this.timeScaleHandler}>10 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="twenty-years" onClick={this.timeScaleHandler}>20 Years</Button>
                        </div>
                        <OneYear regEq={this.state.regressionEquation} regEq3={this.state.regressionEquation3} />
                    </div>
                );
            case 60:
                return (
                    <div>
                        <div className="cashFlow-btn-group">
                            <Button color="info" className="cashFlowBtn" onClick={this.timeScaleHandler}>30 Days</Button>
                            <Button color="info" className="cashFlowBtn" name="one-year" onClick={this.timeScaleHandler}>1 Year</Button>
                            <Button disabled={true} color="info" className="cashFlowBtn" name="five-years" onClick={this.timeScaleHandler}>5 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="ten-years" onClick={this.timeScaleHandler}>10 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="twenty-years" onClick={this.timeScaleHandler}>20 Years</Button>
                        </div>
                        <FiveYears regEq={this.state.regressionEquation} regEq3={this.state.regressionEquation3} />
                    </div>
                );
            case 120:
                return (
                    <div>
                        <div className="cashFlow-btn-group">
                            <Button color="info" className="cashFlowBtn" onClick={this.timeScaleHandler}>30 Days</Button>
                            <Button color="info" className="cashFlowBtn" name="one-year" onClick={this.timeScaleHandler}>1 Year</Button>
                            <Button color="info" className="cashFlowBtn" name="five-years" onClick={this.timeScaleHandler}>5 Years</Button>
                            <Button disabled={true} color="info" className="cashFlowBtn" name="ten-years" onClick={this.timeScaleHandler}>10 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="twenty-years" onClick={this.timeScaleHandler}>20 Years</Button>
                        </div>
                        <TenYears regEq={this.state.regressionEquation} regEq3={this.state.regressionEquation3} />
                    </div>
                );
            case 240:
                return (
                    <div>
                        <div className="cashFlow-btn-group">
                            <Button color="info" className="cashFlowBtn" onClick={this.timeScaleHandler}>30 Days</Button>
                            <Button color="info" className="cashFlowBtn" name="one-year" onClick={this.timeScaleHandler}>1 Year</Button>
                            <Button color="info" className="cashFlowBtn" name="five-years" onClick={this.timeScaleHandler}>5 Years</Button>
                            <Button color="info" className="cashFlowBtn" name="ten-years" onClick={this.timeScaleHandler}>10 Years</Button>
                            <Button disabled={true} color="info" className="cashFlowBtn" name="twenty-years" onClick={this.timeScaleHandler}>20 Years</Button>
                        </div>
                        <TwentyYears regEq={this.state.regressionEquation} regEq3={this.state.regressionEquation3} />
                    </div>
                );
            default:
                return <h1>An error occurred</h1>
        }
    }
}




