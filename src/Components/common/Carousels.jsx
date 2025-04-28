
import React from 'react';
import { Carousel } from 'react-bootstrap';
import weddingImg from '../../assets/images/carousel/wedding.jpg';

import birthdayImg from '../../assets/images/carousel/birthday1.jpg';

import corporateImg from '../../assets/images/carousel/cooperative.jpg';

const Carousels = () => (
  <Carousel fade interval={4000}>
    <Carousel.Item>
      <img className="d-block w-100 " src={weddingImg} alt="Wedding Event" />
      <Carousel.Caption>
        <h3 className="fw-bold">Dream Weddings</h3>
        <p>Plan your perfect wedding with Eventara — flowers, decor, music, and more.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img className="d-block w-100 " src={birthdayImg} alt="Birthday Celebration" />
      <Carousel.Caption>
        <h3 className="fw-bold ">Magical Birthdays</h3>
        <p>Make your loved ones feel special with themed birthday parties.</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img className="d-block w-100 " src={corporateImg} alt="Corporate Event" />
      <Carousel.Caption>
        <h3 className="fw-bold" style={{ color: 'white' }}>Professional Events</h3>
        <p>Host flawless corporate and private gatherings with ease.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Carousels;
