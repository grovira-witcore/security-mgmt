import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from './witcore.js';

Witcore.RatingBar = function ({ value, color }) {
  const starsContainerRef = React.useRef(null);

  React.useEffect(() => {
    let countOfFilledStars = Math.floor(value);
    let decimalPart = null;
    if (countOfFilledStars < 0) {
      countOfFilledStars = 0;
      decimalPart = 0;
    }
    else if (countOfFilledStars > 5) {
      countOfFilledStars = 5;
      decimalPart = 0;
    }
    else {
      decimalPart = value - countOfFilledStars;
    }
    const stars = starsContainerRef.current.childNodes;
    for (let i = 0; i < countOfFilledStars; i++) {
      stars[i].classList.add('text-' + (color ?? 'yellow'));
    }
    if (countOfFilledStars < 5 && decimalPart > 0) {
      const partialStar = stars[countOfFilledStars];
      partialStar.style.clipPath = `polygon(0 0, ${decimalPart * 100}% 0, ${decimalPart * 100}% 100%, 0% 100%)`;
      partialStar.classList.add('text-' + (color ?? 'yellow'));
    }
  }, [value]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>
      <div className="fs-4 text-light" style={{ position: 'relative', zIndex: 2 }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div ref={starsContainerRef} className="fs-4 text-light" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};
