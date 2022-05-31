import React from "react";

import Cards from "./PaymentDetails/Cards";
import BanksButtons from "./PaymentDetails/BanksButtons";
import Paypal from "./PaymentDetails/Paypal";
import InPerson from "./PaymentDetails/InPerson";

const DonatePageInfo = () => (
    <div className="donate-page-container">
        <Cards/>
        <BanksButtons/>
        <Paypal/>
        <InPerson/>
    </div>
)

export default DonatePageInfo;
