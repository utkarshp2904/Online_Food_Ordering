import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import Button from '@material-ui/core/Button';

const S3_BUCKET ='csci5410-group-project-recipe-bucket';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: 'ASIATEUA36HW4NPZ2F5S',
    secretAccessKey: '6XEHm5kJYJrX+OAJKUFyHU1Uw591HYlXcHZtD6Nb',
    sessionToken: "FwoGZXIvYXdzEFEaDASad16D1Y0Yo0yU1SK/ASevHPgIGRCv2RXKbNH7j1zUPHbfCDuzZrXlGhypTJ0Y8t7WHDj22iUMUEX/YfBh7pc/qvKc1goOQpcTg37XQRDk98kKm7wW3PPiwMpBrsJxEuyZVf9uGzFxv1lCyJwiLO6hcQDA9b68t+hkvp7I9tabLpCU6j2vJeoDISWdGoFSWEnnTPBFM3dXi4QTUv/M5ka1VMWqexmUhfy4GFGnxYCTtZM9OKTv47fxFDFTpTVfgarzJiF1A45S0Oswe1uHKNC1+4cGMi3VEZUJg3GJpTyWf8W2kQn+zTImQWyIxHo7UvILFcChKfDNLcvS+MkDLBU9U7Y=",
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


const ML = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState('');

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }
	const onFetch = () =>{
		fetch('https://csci-5410-group-project-output.s3.amazonaws.com/output.txt')
			.then(function(response){
				return response.text();
			}).then(function (data) {
			console.log(data);
			setData(data);
		})
	};

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div>Upload you recipe {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <Button variant="outlined" onClick={() => uploadFile(selectedFile)}> Upload to S3</Button>
		<Button variant="outlined" onClick={onFetch}>Show Similarity</Button>
		<h2>{data}</h2>
    </div>
}

export default ML;