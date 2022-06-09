import React from "react";

import Cards from "./PaymentDetails/Cards";
import BanksButtons from "./PaymentDetails/BanksButtons";
import Paypal from "./PaymentDetails/Paypal";
import InPerson from "./PaymentDetails/InPerson";

import "./style.scss"

const DonatePageInfo = () => (
    <div className="donate-page--parent">
        <div className="donate-page-container">
            <div className="donate-page--cards-container">
                <Cards/>
                <Paypal/>
                <InPerson/>
            </div>
            <BanksButtons/>
        </div>
    </div>
)

export default DonatePageInfo;
