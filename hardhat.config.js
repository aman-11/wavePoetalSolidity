require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
       // !! Alchemy URL,
      // !! metamsk private key
    },
  },
};


//7668647ecd047b2f6cc4863939e8d5a44266dc580958ecbfec31db26c09684e9

/**
 * 
Why do you need to use your private key? Because in order to perform a transaction 
like deploying a contract, you need to "login" to the blockchain.
 And, your username is your public address 
and your password is your private key. It's kinda like logging into AWS or GCP to deploy.
 */