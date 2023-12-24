import * as paymentService from "../services/payment-service.js";
import {setResponse, setErrorResponse} from './response-handler.js'

export const processPayment = async(req, res)=>{
    try{
        const result = await paymentService.processPayment(req.body.paymentMethodNonce);
        setResponse(result, res);
    }catch(err){
        setErrorResponse(err, res);
    }
}

export const getClientToken = async (req, res) => {
    try {
      const clientToken = await paymentService.generateClientToken();
      console.log("getting here")
      console.log("🚀 ~ file: payment-controller.js:17 ~ getClientToken ~ clientToken:", clientToken)
      setResponse(clientToken, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
  };