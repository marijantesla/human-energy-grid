const contractAddress = "0x1EFD58CF6547Df949740b37d97405b2D87915369";
const contractABI = [
 {
   "inputs": [],
   "stateMutability": "nonpayable",
   "type": "constructor"
 },
 {
   "inputs": [
     {
       "internalType": "address",
       "name": "to",
       "type": "address"
     },
     {
       "internalType": "uint256",
       "name": "amount",
       "type": "uint256"
     }
   ],
   "name": "transfer",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "decimals",
   "outputs": [
     {
       "internalType": "uint8",
       "name": "",
       "type": "uint8"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "feePercent",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "name",
   "outputs": [
     {
       "internalType": "string",
       "name": "",
       "type": "string"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "owner",
   "outputs": [
     {
       "internalType": "address",
       "name": "",
       "type": "address"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "symbol",
   "outputs": [
     {
       "internalType": "string",
       "name": "",
       "type": "string"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "totalSupply",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "address",
       "name": "",
       "type": "address"
     }
   ],
   "name": "balanceOf",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 }
];

let stepCount = 0;
let intervalId;

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('startButton').addEventListener('click', startTracking);

async function connectWallet() {
 if (window.ethereum) {
   try {
     await window.ethereum.request({ method: 'eth_requestAccounts' });
     document.getElementById('status').textContent = "Status: Spojeno";
     document.getElementById('startButton').disabled = false;
   } catch (error) {
     console.error("Greška pri spajanju:", error);
   }
 } else {
   alert("Instaliraj MetaMask!");
 }
}

function startTracking() {
 stepCount = 0;
 document.getElementById('steps').textContent = `Koraci: ${stepCount}`;

 intervalId = setInterval(() => {
   stepCount += 10;
   document.getElementById('steps').textContent = `Koraci: ${stepCount}`;

   if (stepCount % 100 === 0) {
     rewardSteps(100);
   }
 }, 3000);
}

async function rewardSteps(steps) {
 try {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);

   const tokens = Math.floor(steps / 100);
   const tx = await tokenContract.transfer(await signer.getAddress(), tokens.toString());
   await tx.wait();

   alert(`Dobili ste ${tokens * 0.7} QES! (30% fee za održavanje projekta)`);
 } catch (error) {
   console.error("Greška pri nagrađivanju:", error);
   alert(`Greška: ${error.message || "Provjeri MetaMask i internet vezu"}`);
 }
}
