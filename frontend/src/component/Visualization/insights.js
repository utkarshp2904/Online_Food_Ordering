import React from "react";
import Iframe from 'react-iframe'

function insights () { 
    return (
    <div>
      <h1> Your Order Insights</h1>
     <Iframe url="https://datastudio.google.com/embed/reporting/23da92de-5dee-4f04-be70-57a30315472e/page/n6fWC"
        width="960px"
        height="960px"
        display="initial"
        position="relative"/>
    </div>
    )
  }

export default insights;