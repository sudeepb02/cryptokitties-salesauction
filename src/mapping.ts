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
  Unpause
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
}

export function handleAuctionSuccessful(event: AuctionSuccessfulEvent): void {
  let entity = new AuctionSuccessful(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.totalPrice = event.params.totalPrice
  entity.winner = event.params.winner
  entity.save()
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
