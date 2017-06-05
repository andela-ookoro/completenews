import React from 'react';

// class to display not found
const RouteNotFound = () => (
  <div className="notfound">
    <div className="blueBlock">
      <p> <em>Sorry </em></p>
    </div>
    <p> Page not Found </p>
    <p>If you think you have arrived here by our mistake</p>
    <p> please contact us via &nbsp;
        <a
          href="mailto:okwudiri.okoro@andela.com?Subject=User%20Feedback"
          target="_top"
        >
         mail
      </a>
    </p>
  </div>
);
export default RouteNotFound;
