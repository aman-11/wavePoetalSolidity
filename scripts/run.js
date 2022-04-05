const main = async () => {
  //in oredr to deploy contract in blockchain we need wallet address but HRE takes care of that
  //so we are pulling those address to code level using '.getSigners()'
  // const [owner, randomPerson] = await hre.ethers.getSigners();

  //compile file->genrates file -> artifavts
  //hre --> hardhat run env
  // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //create a local ethereum network for us so each time you run new env as it destroys teh  netwrork after script overs
  // const waveContract = await waveContractFactory.deploy();
  //   Our constructor runs when we actually deploy.
  // await waveContract.deployed();

  //----------------------------- after deploying ----------------------------------------------//

  // console.log("Contarct deployed by", owner.address);
  //using some contract function to check if working fine by " waveContract "
  //TODO u can call the function same as API
  // let waveCount, waveTxn;
  //   waveCount = await waveContract.getTotalWaves();

  //   TODO now wave on contract so that it can inc the count
  //   let waveTxn = await waveContract.wave();

  //   TODO assert the waveCount after this by fetching the value
  //   waveCount = await waveContract.getTotalWaves();

  // so here waveCount is the object {"value":"1"}
  //   console.log("ddd", waveCount);

  //with this address we can find te contarct on blockchain
  //console.log("Contract deployed to:", waveContract.address);

  //now wave  will be done by other address
  //TODO 1. connect the contarct
  // waveTxn = await waveContract.connect(randomPerson).wave();
  //mining  started
  // await waveTxn.wait();
  //mining
  // waveCount = await waveContract.getTotalWaves();

  // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // const waveContract = await waveContractFactory.deploy();
  // await waveContract.deployed();
  // console.log("Contract addy:", waveContract.address);
  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();
  // console.log(waveCount.toNumber());

  // /**
  //  * Let's send a few waves!
  //  */
  // let waveTxn = await waveContract.wave("A message!");
  // await waveTxn.wait(); // Wait for the transaction to be mined

  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  // await waveTxn.wait(); // Wait for the transaction to be mined

  // let allWaves = await waveContract.getAllWaves();
  // console.log(allWaves);

  // waveCount = await waveContract.getTotalWaves();
  // console.log(waveCount.toNumber());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //!! important
  // The magic is on hre.ethers.utils.parseEther("0.1"),.
  // This is where I say, "go and deploy my contract and fund it with 0.1 ETH".
  // This will remove ETH from my wallet, and use it to fund the contract. That's it.
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Initial (0.1) Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Send Wave
   */
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "after first wave Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  /*
   * Send Wave
   */
  waveTxn = await waveContract.wave("A another  message!");
  await waveTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "after second wave Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log("------------");
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
