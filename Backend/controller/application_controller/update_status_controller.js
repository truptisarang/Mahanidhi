const app_model = require("../../model/application_model");
const axios = require("axios");
const disburseFunds = require("../services/fund_disbursement");
const userModel = require("../../model/users_model");

const fetchExchangeRates = async () => {
  try {
    const exchange_rates = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/INR`
    );
    if (exchange_rates.data.result === "success") {
      const USD_exchange_rate = exchange_rates.data.conversion_rates["USD"];
      return USD_exchange_rate;
    }
  } catch (error) {
    console.log("Error while fetching exchange rates");
  }
};

const update_status_controller = async (req, res) => {
  const { Data } = req.body;
  console.log(Data);
  try {
    if (Data.status === "Reject") {
      const response = await app_model.findOneAndUpdate(
        { applicationId: Data.appid },
        { status: Data.status, remarks: Data.remarks }
      );
      if (response) {
        res.json({ success: true });
      }
    } else {
      const response = await app_model.findOneAndUpdate(
        { applicationId: Data.appid },
        { status: Data.status, amount: Data.amount },
        { new: true }
      );
      const aadhaar = response.AadhaarNumber;

      const user_response = await userModel.findOne({ AadhaarNumber: aadhaar });
      const wallet_address = user_response.WalletAddress;
      console.log(wallet_address);

      if (response && user_response) {
        const USD_exchange_rate = await fetchExchangeRates();
        const inr_amt = parseInt(Data.amount);
        const USD_amount = parseInt(inr_amt * USD_exchange_rate);
        disburseFunds(wallet_address, USD_amount);
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = update_status_controller;
