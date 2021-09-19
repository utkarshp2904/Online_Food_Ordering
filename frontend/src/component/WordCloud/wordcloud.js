import React from "react";
import Axios from "axios";
import WordCloudImage from "./WordCloudImage";
import Button from '@material-ui/core/Button';

function WordCloud () { 
  const [open, setOpen] = React.useState(false);
  const generateWordCloud = async (event) => {
     event.preventDefault();
     await Axios.get("https://x9ploancwd.execute-api.us-east-1.amazonaws.com/prod/{proxy+}")
     setOpen(true);
  }
    return (
    <div>
      <br/>
      <br/>
      <div style={{ textAlign: "center" }}>
        <Button variant="outlined" onClick={generateWordCloud}>
          Generate Word Cloud
        </Button>
      </div>
      {open ? (
        <React.Suspense fallback={<h1>loading....</h1>}> 
          <WordCloudImage/>
        </React.Suspense>
      ) : null}
    </div>
    )
  }

export default WordCloud;