const contractAddress = "0xTVOJA_ADRESA"; // ZAMIJENI SA TVOJOM ADRESOM!
const contractABI = []; // DODAJ ABI OVDJE

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
 }
}

