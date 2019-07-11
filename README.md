# Cryptokitties Subgraph

Cryptokitties was one of the first blockchain games built using NFT tokens, or ERC-721s. The concept of collectible tokens is still fairly new and we believe that analyzing patterns on CryptoKitties will allow future game designers to gain valuable insights into how users interact with NFT-based games.

This subgraph sources data from the Cryptokitties SalesAuction and SiringAuction Smart Contract. The main focus of this subgraph is to index data which is not readily available using the public functions of the Cryptokitties Smart Contract.

For example
> Do people play Cryptokitties more on weekends?

> How many auctions have been created till now? Out of them, how many were successful and how many weren't?

> How realistic are players when they set price expectations for their auctions?

***
## Cryptokitties Sales Auction
This subgraph indexes the data from [Cryptokitties Sales Auction](https://etherscan.io/address/0xb1690c08e213a35ed9bab7b318de14420fb57d8c) and is deployed to the Graph Explorer [here](https://thegraph.com/explorer/subgraph/sudeepb02/cryptokitties-salesauction).
Subgraph for the [Cryptokitties Siring Auction](https://etherscan.io/address/0xc7af99fe5513eb6710e6d5f44f9989da40f27f26) is deployed [here](https://thegraph.com/explorer/subgraph/sudeepb02/cryptokitties-siringauction). 
Though it is possible to have multiple data sources for a smart contract, both these smart contracts have almost same structure and emit the same events. Adding siring auctions smart contract to the sales auction was breaking the current one, so we thought it better to avoid the debugging and to deploy them as separate subgraphs for the hackathon as time was limited. Source code for the Cryptokitties Siring auction can be accessed [here](https://github.com/sudeepb02/cryptokitties-siringauction). Both these sources would be added under a single subgraph after the Beyond Blockchain hackathon.

A Decentralized web app to visualize the current functionaly lives [here](http://68.183.80.178:3000) and the source code for the dApp is available [here](https://github.com/michaelcohen716/kitties-graph)

## Functionality
The Cryptokitties subgraph currently implements the following functionality:

#### Daily Stats for Sales and Siring
This functionality helps to analyze how people are interacting with the game over time as well as displaying recent trends.
It also gives some sense for the adoption rate of the game, the average number of transaction in a week, month, quarter, etc. and recent trends around on-boarding new players to the game.

Daily stats can show the connection between major game events (the announcement of a new fancy cat or a leaderboard contest, for example) and how player trends. Measuring the effectiveness of game-design initiatives will be critical for future game designers and engineers.

For example, it's been observed that the siring counts are elevated right after a new Fancy is announced, and just before the deadline of a leaderboard contest

> Currently, as the AssemblyScript API only supports returning the epoch time (and not functions to return day, month and year), a quick hack to implement this functionality was to divide the Unix time by 86400 (60*60*24) and use it as an ID for saving and retrieving data. A feature request for this functionality can be found [here](https://github.com/graphprotocol/support/issues/26).

#### Sales Summary
The subgraph can be queried to provide the overall sales summary of the smart contract. The following data has been indexed and can be retrieved easily
  * Total number of Sales auctions created
  * Total value of Sales auctions created
  * Total number of Sales auctions completed
  * Total value of Sales auctions completed
  * Total number of Sales auctions cancelled
  * Total value of Sales auctions cancelled
  
#### Siring Summary
Similar to Sales summary, the subgraph can be queried to provide the overall siring summary of the smart contract.
  * Total number of Siring auctions created
  * Total value of Siring auctions created
  * Total number of Siring auctions completed
  * Total value of Siring auctions completed
  * Total number of Siring auctions cancelled
  * Total value of Siring auctions cancelled
  
  #### Kitty Master
  Kitty Master provides insight into how a user interacts with the Cryptokitties platform. It provides user specific details such as when was the first time a user (an ethereum address) interacted with this game, total kitties an user has bought and the value spent on buying, total kitties sold by the user and the amount earned by selling cryptokitties, last time a user interacted with the platform and so on.
  Such data can be useful to analyze the spread of the game, such as how much an average user is spending on buying cryptokitties and so on.
  
  #### Functionalities planned to be implemented
 * Add data to dApp already available through Smart contract functions - This is not a priority for hackathon as it involves just getting data from smart contract and displaying it.
 * How many unique users (addresses) have played this game and how many of them are still active in the last *x days*
 * Add Wrapped Cryptokitties smart contract as another data source

    
    
  #### Team
    * Sudeep Biswas, github: sudeepb02
    * Michael Cohen, github: michaelcohen716
    
