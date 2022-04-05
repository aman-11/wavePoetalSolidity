// SPDX-License-Identifier: UNLICENSED

//says compiler to not use the low version than this
pragma solidity ^0.8.4;

//hardhat gives functionality to console log for smart contarcts
// import "hardhat/console.sol";
import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;

    /*
     * We will be using this below to help generate a random number
     */
    uint256 private seed;

    //implementing logic for teh cooldown i.e user can wave after 15min
    mapping(address => uint256) lastWaveAt;

    event NewWave(address indexed from, uint256 timestamp, string message); //Event to be captured in front end

    /*
     * I created a struct here named Wave.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */
    struct Wave { 
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    
    //variable " waves " --> store --> an array of structs.
    Wave[] waves;


    constructor() payable {
        //intialize seed 
        seed = (block.timestamp + block.difficulty) % 100;
        console.log("Yo yo, I am a contract and I am smart and seed init: %d", seed);
    }

    function wave(string memory _message) public {
        
        require(lastWaveAt[msg.sender] + 15 minutes < block.timestamp,
            "wait for 15min"
        );
        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        // console.log("%s has waved!", msg.sender);   //msg.sender is the address of person called the function
        waves.push(Wave(msg.sender, _message, block.timestamp)); //array --> push --> of type struct
        

         seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
             console.log("%s won!", msg.sender);
            //in return give prize
            uint256 prizeAmount = 0.0001 ether;

            //similar to if else block  if the owner of contract has less money than prize money dont let it send
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        //emit event so that client can know task is done successfully
        emit NewWave(msg.sender,  block.timestamp, _message);
    }


    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        // console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
