# Cryptokitties Subgraph

Cryptokitties is one of the first games built on blockchain based on NFT tokens. It is important to analyze how people interact with such games, so that future games can be designed accordingly. 
This subgraph sources data from the Cryptokitties SalesAuction and SiringAuction Smart Contract. The main focus of this subgraph is to index data which is not readily available using the public functions of the Cryptokitties Smart Contract.

For example
> Do people play Cryptokitties more on weekends?

> How many auctions have been created till now? Out of them, how many were successfull and how many were cancelled?

> Do people tend to give unrealistic price for their auctions?

***
## Cryptokitties Sales Auction
This subgraph indexes the data from [Cryptokitties Sales Auction](https://etherscan.io/address/0xb1690c08e213a35ed9bab7b318de14420fb57d8c) and deployed to the Graph Explorer [here](https://thegraph.com/explorer/subgraph/sudeepb02/cryptokitties-salesauction).
Subgraph for the [Cryptokitties Siring Auction](https://etherscan.io/address/0xc7af99fe5513eb6710e6d5f44f9989da40f27f26) is deployed [here](https://thegraph.com/explorer/subgraph/sudeepb02/cryptokitties-siringauction). 
Though it is possible to have multiple data sources for a smart contract, as both these smart contracts have almost same structure and emit the same events, I thought it better to deploy them as separate subgraphs for the hackathon as time is limited and can't spend much time on figuring this out (not sure even if this is possible, added in to-do list)

A Decentralized web app to visualize the current functionaly lives [here](https://github.com/michaelcohen716/kitties-graph)

## Functionality
The Cryptokitties subgraph currently implements the following functionality

#### Daily Stats for Sales and Siring
This functionality helps in analyzing how people are interacting with the game over time and the recent trends.
It also gives an idea about the adoption rate of the game, what is the average number of transaction in a week, month, quarter, etc. and if it is increasing with time indicating the inclusion of new players in the game.
Per day stats can help to link certain events like the announcement of a new fancy cat or a leaderboard contest to how players interact after such an announcement.
This can be useful in analyzing if the counts increased after an announcement and which events were successful, and can be used to plan future events accordingly.
It has also been observed that the siring counts are high right after a new Fancy is announced, and just before the deadline of a leaderboard contest

> Currently, as the AssemblyScript API only supports returning the epoch time (and not functions to return day, month and year), a quick hack to implement this functionality was to divide the Unix time by 86400 (60*60*24) and use it as an ID for saving and retrieving data.

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
  Kitty Master provides an insight on how a user interacts with the Cryptokitties platform. It provides user specific details such as when was the first time a user (an ethereum address) interacted with this game, total kitties an user has bought and the value spent on buying, total kitties sold by the user and the amount earned by selling cryptokitties, last time a user interacted with the platform and so on.
  Such data can be useful to analyze the spread of the game, such as how much an average user is spending on buying cryptokitties and so on.
  
  #### Functionalities Planned to be implemented
    * How many users (addresses) have played this game and how many of them are active
    * Add Wrapped Cryptokitties smart contract as another data source
    
    
    
    
