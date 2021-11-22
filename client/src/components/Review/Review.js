import React, { useState, useRef } from 'react'
import ReviewWrapper from './ReviewWrapper'

import "./Review.scss";

export default function Review() {
    return(
        <ReviewWrapper 
            numberOfExam={1}
            dateOfExam={2}
            videoOfExam={3}
            examDescription={4}
        />
    )
}