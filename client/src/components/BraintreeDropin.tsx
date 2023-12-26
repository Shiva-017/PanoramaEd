import React, { ReactElement, useEffect, useState } from 'react'
import dropin from "braintree-web-drop-in"
import { Button } from '@mui/material';

type Props = {
    show: boolean,
    onPaymentCompleted: any,
}
const BraintreeDropIn: React.FC<Props> = (props: Props): ReactElement => {
    const [braintreeInstance, setBraintreeInstance] = useState<any>(undefined);

    const makeTransaction = async (paymentMethodNonce: any) => {
        try {

            const response = await fetch(`http://localhost:3001/process-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",

                },
                body: paymentMethodNonce,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
        if (props.show) {
            const initializeBraintree = () => {
                dropin.create({
                    authorization: "sandbox_mffhjqgc_q6q7wmsf9fwt7xpv",
                    vaultManager: true,
                    container: '#braintree-drop-in-div',
                    card: {
                        cardholderName: {
                            required: true
                        }
                    }
                }, function (error, instance) {
                    if (error)
                        console.error(error)
                    else
                        setBraintreeInstance(instance);
                })
            };


            if (braintreeInstance) {

                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            }
        }
    }, [props.show])

    return (
        <div
            style={{ display: `${props.show ? "block" : "none"}` }}
        >
            <div
                id={"braintree-drop-in-div"}
            />
            <Button
                variant='contained'
                onClick={async () => {
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            (error: any, payload: any) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    makeTransaction(payload.nonce);
                                    props.onPaymentCompleted();
                                }
                            });
                    }
                }}
            >
                Pay
            </Button>
        </div>
    )
}

export default BraintreeDropIn;