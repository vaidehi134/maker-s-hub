package com.example.MakersHub.enums;

public enum PostStatus {
    PENDING, // Default when a post is created
    ACCEPTED, // When a crafter accepts the proposal
    ASSIGNED, //when client assignes crafter for a post
    IN_PROGRESS, // When work has started
    COMPLETED, // When work is finished
    AWAITING_PAYMENT,// work is completed , crafter has uploded his work done and now he is waiting for the payment
    PAID,  //payment for crafter's work is done
    PAYMENT_ACKNOWLEDGED,
}
