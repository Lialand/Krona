import React, { useState, useRef } from 'react'
import ReviewWorks from './ReviewWorks'

export default function WrapperRev(props) {
    return(
        <div className="blockOfReview">
            <div className="reviewNumber">
                <h4>{props.numberOfReview}</h4>
                <p>{props.dateOfReview}</p>
                <div className="videoOfReview">
                    {props.videoOfReview}
                </div>
                <p className="reviewDescription">
                    {props.reviewDescription}
                </p>
            </div>
            <div className="trackWorks">
                <div className="headOfTrack">
                    <h3>Работы, которые рассматривались на разборе</h3>
                    <div className="touchTrack">
                        <button className="right"></button>
                        <button className="left"></button>
                    </div>
                </div>
            </div>
            <ReviewWorks />
        </div>
    )
}