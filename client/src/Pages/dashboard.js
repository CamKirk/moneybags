import React, { Component } from "react";
// import tamagotchi from "../imgs/tamagotchi200x180.png";
import neutralBigFoot from "../imgs/bigFootSVGs/neutralBigFoot.svg";
// import Baseline from "../components/UserDashboard/Baseline";
import CashFlow from "../components/UserDashboard/CashFlow";
// import FinancialOverview from "../components/UserDashboard/FinancialOverview";
import TotalSpending from "../components/UserDashboard/TotalSpending";
import TransactionDetail from "../components/UserDashboard/TransactionDetail";
import Achievement from "../components/Achievements/Achievement";

import ProgressBar from "../components/ProgressBar/Progress";
// import { Button } from 'reactstrap';

import {
  Card
} from 'reactstrap';
import "./dashboard.css";
class dashboard extends Component {
  render() {
    return (


      <div>

        <h1>

          Money Tree: User Dashboard
        </h1>

        {/* <Baseline /> */}
        {/* <Button color="danger">Danger!</Button> */}
        <div className="col-12">
          <div className="container">
          <div className="Acheivement">

            <div className="row">

              <div className="col-md-4">


                <Card>
                  <h1> BigFoot Avatar </h1>
                  <img className="neutralBigFoot" src={neutralBigFoot} alt="logo" />


                  {/* <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

    </CardBody> */}
                </Card>
              </div>
              <div className="col-md-8 text-center">
                <Card>
                  <h1> Achievements </h1>

                  <Achievement />


                  {/* <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

    </CardBody> */}
                </Card>

              </div>
            </div>
          </div>
        
        <hr>
        </hr>
        <div className="row">
         <div className="col-12">
          {/* <div className="container"> */}
            <div className="ProgressBar">
              <Card>
                <h1> Progress Bar </h1>
                <ProgressBar />

              </Card>

            </div>
          {/* </div> */}
         </div>
        </div>

        <hr>
        </hr>


         <div className="CashFlow">
            <div className="row">

              <div className="col-12 text-center">
                <Card>
                  <h1> CashFlow </h1>
                  <CashFlow />


                  {/* <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                    </CardBody> */}
                </Card>

              </div>
            </div>
          </div>

          {/* <div>
              <Card>

                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                </CardBody>
              </Card>
            </div> */}

          <hr>

          </hr>

          <div className="TransactionDetail">

            <div className="row">
              <div className="col-md-8">
              <Card>
                  <h1> TransactionDetail</h1>

                  <TransactionDetail />




                  {/* <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                    </CardBody> */}
                </Card>

                
              </div>

              <div className="col-md-4">
              <Card>
                  <h1> TotalSpending</h1>
                  <TotalSpending />


                  {/* <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                    </CardBody> */}
                </Card>
                
              </div>

            </div>

          </div>
        </div>
      </div>
      </div >

      // <FinancialOverview />

                
    );
  }
}



export default dashboard;
