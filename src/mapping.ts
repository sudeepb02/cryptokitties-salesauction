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
  SalesSummary
} from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.startingPrice = event.params.startingPrice
  entity.endingPrice = event.params.endingPrice
  entity.duration = event.params.duration
  entity.save()

  let bigInt0 = event.params.startingPrice - event.params.startingPrice

  //Get Sales summary entity, if does not exist, create new
  let salesSummary = SalesSummary.load("1");
  if (salesSummary == null) {
    salesSummary = new SalesSummary("1")
    salesSummary.auctionsCreated = 0
    salesSummary.auctionsCompleted = 0
    salesSummary.auctionsCancelled = 0

    salesSummary.valueCreated = bigInt0
    salesSummary.valueCompleted = bigInt0
    salesSummary.valueCancelled = bigInt0
  }

  //Increment the auctionsCreated count
  let auctionsCreatedCount = salesSummary.auctionsCreated
  auctionsCreatedCount = auctionsCreatedCount + 1
  salesSummary.auctionsCreated = auctionsCreatedCount

  //Increment the value of auctions created
  let valueCreatedETH = salesSummary.valueCreated
  valueCreatedETH = valueCreatedETH + event.params.startingPrice
  salesSummary.valueCreated = valueCreatedETH
  salesSummary.save()

}

export function handleAuctionSuccessful(event: AuctionSuccessfulEvent): void {
  let entity = new AuctionSuccessful(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.totalPrice = event.params.totalPrice
  entity.winner = event.params.winner
  entity.save()

  let bigInt0 = event.params.totalPrice - event.params.totalPrice

  //Get Sales summary entity if exists, else create new
  let salesSummary = SalesSummary.load("1");
  if (salesSummary == null) {
    salesSummary = new SalesSummary("1")
    salesSummary.auctionsCreated = 0
    salesSummary.auctionsCompleted = 0
    salesSummary.auctionsCancelled = 0

    salesSummary.valueCreated = bigInt0
    salesSummary.valueCompleted = bigInt0
    salesSummary.valueCancelled = bigInt0
  }

  //Increment the auctionsCompleted count
  let auctionsCompletedCount = salesSummary.auctionsCompleted
  auctionsCompletedCount = auctionsCompletedCount + 1
  salesSummary.auctionsCompleted = auctionsCompletedCount

  //Increment the value of auctions completed
  let valueCompletedETH = salesSummary.valueCompleted
  valueCompletedETH = valueCompletedETH + event.params.totalPrice
  salesSummary.valueCompleted = valueCompletedETH
  salesSummary.save()

}

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let entity = new AuctionCancelled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.save()
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
