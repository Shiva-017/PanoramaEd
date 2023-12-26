import React from "react";
import BraintreeDropIn from "../../components/BraintreeDropin";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PaymentGateWay = () => {
    const [showBraintreeDropIn, setShowBraintreeDropIn] = React.useState(true);
    return (
        <div style={{ position: 'absolute', top: "120px", left: "400px" }}>
            <BraintreeDropIn
                show={showBraintreeDropIn}
                onPaymentCompleted={() => {
                    setShowBraintreeDropIn(false);
                }}
            />
            {!showBraintreeDropIn ? <Stack direction="column" gap={5} alignItems="center" sx={{width:"500px", marginLeft:"600px", marginTop:"100px"}}>
                <Typography variant="h3">Payment Successful!</Typography>
                <Link to="/posts">
                    <Button variant="contained">Go to home</Button>
                </Link>
            </Stack> : null}
        </div>
    )
}

export default PaymentGateWay;