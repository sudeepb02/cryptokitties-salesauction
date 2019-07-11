import {
  AuctionCreated as AuctionCreatedEvent,
  AuctionSuccessful as AuctionSuccessfulEvent,
  AuctionCancelled as AuctionCancelledEvent,
  Pause as PauseEvent,
  Unpause as UnpauseEvent
} from "../generated/Contract/Contract"
import {
  AuctionCreated,
  AuctionSuccessful,
  AuctionCancelled,
  Pause,
  Unpause,
  SalesSummary,
  Master,
  DailyStat
} from "../generated/schema"

import {BigInt} from '@graphprotocol/graph-ts'

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.startingPrice = event.params.startingPrice
  entity.endingPrice = event.params.endingPrice
  entity.duration = event.params.duration
  entity.save()

  //Get Sales summary entity from the store.
  //If it does not exist(is null), create new
  let salesSummary = SalesSummary.load("1");
  if (salesSummary == null) {
    salesSummary = new SalesSummary("1")
    salesSummary.auctionsCreated = 0
    salesSummary.auctionsCompleted = 0
    salesSummary.auctionsCancelled = 0

    salesSummary.valueCreated = BigInt.fromI32(0) 
    salesSummary.valueCompleted = BigInt.fromI32(0)
    salesSummary.valueCancelled = BigInt.fromI32(0)
  }

  //Increment the auctionsCreated count
  salesSummary.auctionsCreated = salesSummary.auctionsCreated + 1

  //Increment the value of auctions created
  salesSummary.valueCreated = salesSummary.valueCreated + event.params.startingPrice

  //Save the sales summary in store
  salesSummary.save()

  //Get Master entity from store
  //If it is null(does not exist), create new
  //Ethereum address acts as ID for the Master entity
  let master = Master.load(event.transaction.from.toHex())
  if (master == null) {
    master = new Master(event.transaction.from.toHex())
    master.firstTransacted = event.block.timestamp
    master.lastTransacted = event.block.timestamp
    master.totalKittiesBought = 0
    master.totalKittiesSold = 0
    master.valueSpentBuying = BigInt.fromI32(0)
    master.valueEarnedSelling = BigInt.fromI32(0)
  }
  master.lastTransacted = event.block.timestamp
  master.save()

  // Get timestamp for event and convert it to days since epoch
  // Days since epoch will be the ID here to store per day stats
  let day = event.block.timestamp / BigInt.fromI32(86400)
  let dayID = day.toString()
  let dailyStat = DailyStat.load(dayID)
  if (dailyStat == null) {
    dailyStat = new DailyStat(dayID)
    dailyStat.auctionsCreatedToday = 0
    dailyStat.auctionsCompletedToday = 0
    dailyStat.auctionsCancelledToday = 0
    dailyStat.valueCreatedToday = BigInt.fromI32(0)
    dailyStat.valueCompletedToday = BigInt.fromI32(0)
  }

  // Increment the count and value of today's stats
  dailyStat.auctionsCreatedToday = dailyStat.auctionsCreatedToday + 1
  dailyStat.valueCreatedToday = dailyStat.valueCreatedToday + event.params.startingPrice
  dailyStat.save()
}

export function handleAuctionSuccessful(event: AuctionSuccessfulEvent): void {
  let entity = new AuctionSuccessful(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.totalPrice = event.params.totalPrice
  entity.winner = event.params.winner
  entity.save()

  //Get Sales summary entity from the store.
  //If it does not exist(is null), create new
  let salesSummary = SalesSummary.load("1");
  if (salesSummary == null) {
    salesSummary = new SalesSummary("1")
    salesSummary.auctionsCreated = 0
    salesSummary.auctionsCompleted = 0
    salesSummary.auctionsCancelled = 0

    salesSummary.valueCreated = BigInt.fromI32(0)
    salesSummary.valueCompleted = BigInt.fromI32(0)
    salesSummary.valueCancelled = BigInt.fromI32(0)
  }

  //Increment the auctionsCompleted count
  salesSummary.auctionsCompleted = salesSummary.auctionsCompleted + 1

  //Increment the value of auctions completed
  salesSummary.valueCompleted = salesSummary.valueCompleted + event.params.totalPrice
  
  salesSummary.save()
  
  //Get Master entity
  let master = Master.load(event.params.winner.toHex())
  if (master == null) {
    master = new Master(event.params.winner.toHex())
    master.firstTransacted = event.block.timestamp
    master.lastTransacted = event.block.timestamp
    master.totalKittiesBought = 0
    master.totalKittiesSold = 0
    master.valueSpentBuying = BigInt.fromI32(0)
    master.valueEarnedSelling = BigInt.fromI32(0)
  }
  master.totalKittiesBought = master.totalKittiesBought + 1
  master.valueSpentBuying = master.valueSpentBuying + event.params.totalPrice
  master.lastTransacted = event.block.timestamp
  master.save()
  
  let day = event.block.timestamp / BigInt.fromI32(86400)
  let dayID = day.toString()
  let dailyStat = DailyStat.load(dayID)
  if (dailyStat == null) {
    dailyStat = new DailyStat(dayID)
    dailyStat.auctionsCreatedToday = 0
    dailyStat.auctionsCompletedToday = 0
    dailyStat.auctionsCancelledToday = 0
    dailyStat.valueCreatedToday = BigInt.fromI32(0)
    dailyStat.valueCompletedToday = BigInt.fromI32(0)
  }
  dailyStat.auctionsCompletedToday = dailyStat.auctionsCompletedToday + 1
  dailyStat.valueCompletedToday = dailyStat.valueCompletedToday + event.params.totalPrice
  dailyStat.save()

}

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let entity = new AuctionCancelled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.save()

  //Get Sales summary entity from the store.
  //If it does not exist(is null), create new

  let salesSummary = SalesSummary.load("1");
  if (salesSummary == null) {
    salesSummary = new SalesSummary("1")
    salesSummary.auctionsCreated = 0
    salesSummary.auctionsCompleted = 0
    salesSummary.auctionsCancelled = 0

    salesSummary.valueCreated = BigInt.fromI32(0)
    salesSummary.valueCompleted = BigInt.fromI32(0)
    salesSummary.valueCancelled = BigInt.fromI32(0)
  }

  //Increment the auctionsCancelled count
  salesSummary.auctionsCancelled = salesSummary.auctionsCancelled + 1

  //Set the value of auctions cancelled
  salesSummary.valueCancelled = salesSummary.valueCreated - salesSummary.valueCompleted
  salesSummary.save()
   
  let day = event.block.timestamp / BigInt.fromI32(86400)
  let dayID = day.toString()
  let dailyStat = DailyStat.load(dayID)
  if (dailyStat == null) {
    dailyStat = new DailyStat(dayID)
    dailyStat.auctionsCreatedToday = 0
    dailyStat.auctionsCompletedToday = 0
    dailyStat.auctionsCancelledToday = 0
    dailyStat.valueCreatedToday = BigInt.fromI32(0)
    dailyStat.valueCompletedToday = BigInt.fromI32(0)
  }
  dailyStat.auctionsCancelledToday = dailyStat.auctionsCancelledToday + 1
  
  dailyStat.save() 
}

export function handlePause(event: PauseEvent): void {
  let entity = new Pause(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}

export function handleUnpause(event: UnpauseEvent): void {
  let entity = new Unpause(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.save()
}
