import React from "react";
import TwoColouredButton from "../../SharedElements/TwoColouredButton";
import {useSelector} from "react-redux";

import "../style.scss"

const BanksButtons = () => {
    const banks = useSelector(state => state.donate.banks);
    const paypal = useSelector(state => state.donate.PayPal);

    return (
        <div className="donate-page--banks-buttons">
            {banks.length && banks.map(bank => <TwoColouredButton primaryColor={bank["primary-color"]}
                                                                  secondaryColor={bank["secondary-color"]}
                                                                  linkTo={bank.link}
                                                                  text={bank.name}
                                                                  key={bank.name}
                                                                  donate={true}
                                                                  textColor={bank["text-color"]}/>)}
            <TwoColouredButton primaryColor={paypal["primary-color"]}
                               secondaryColor={paypal["secondary-color"]}
                               linkTo={paypal.link}
                               text="PayPal"
                               textColor={paypal["text-color"]}
                               donate={true}
                               src=""/>
        </div>
    )
}

export default BanksButtons;
