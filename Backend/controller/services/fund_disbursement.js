require("dotenv").config({ path: "../Backend/.env" });
const { ethers } = require("ethers");
const app_model = require("../../model/application_model");
const nodemailer = require("nodemailer");
const send_mail = require("../services/email_service");
const user_model = require("../../model/users_model");
let email, amt, wallet_address;

const provider = new ethers.JsonRpcProvider(process.env.INFURA_ENDPOINT);
const pvtKey = process.env.GOVT_WALLET_PVT_KEY;
const govt_wallet = new ethers.Wallet(pvtKey, provider);
const contract_address = process.env.FUND_DIS_CONTRACT_ADDRESS;

const contract_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "disburseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_govtWallet",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "_usdcToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "govtWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsDisbursed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "checkAllowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkUSDCBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "convertToUSDC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "govtWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let contract = new ethers.Contract(contract_address, contract_abi, govt_wallet);


const send_mail_about_fund = async (to) => {
  const response = await send_mail(
    to,
    "Fund disbursed",
    `<h2>Funds Disbursed</h2>
            <p>Dear User,</p>
            <p>We have successfully transferred <strong>$${amt} USDC</strong> to your wallet.</p>
            <p><strong>Wallet Address:</strong> ${wallet_address}</p>
            <p>Thank you \n!</p>
            <b>MahaNidhi </b>
            `
  );
};

const disburseFunds = async (beneficiaryAddr, amount) => {
  try {
    wallet_address = beneficiaryAddr; amt = amount;
    email = await user_model.findOne({WalletAddress:beneficiaryAddr},{Email:1})
    const tx = await contract.disburseFunds(beneficiaryAddr, amount);
  } catch (error) {
    console.error("Smart contract transaction error:", error);
  }
};

contract.on("FundsDisbursed",async(event, beneficiaryAddr, amount,)=>{
  await send_mail_about_fund(email)
})

module.exports = disburseFunds;
