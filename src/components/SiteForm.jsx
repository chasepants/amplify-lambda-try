import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RestaurantForm from './forms/RestaurantForm';
import AboutMeForm from './forms/AboutMeForm';

function SiteForm() {             
    const { REACT_APP_MY_ENV } = process.env;            
    const [postData, setPostData] = useState({});
    const [status, setStatus]     = useState(-1);

    const bucketName   = useSelector(state => state.bucketName);
    const templateName = useSelector(state => state.templateName);
    console.log(bucketName);
    console.log(templateName);
 
    useEffect(()=>{
        const generateWebsiteFiles = async () => {            
            const buildSiteResult = await axios.post(
                'https://aorhdaraf6.execute-api.us-west-1.amazonaws.com/prod/generateWebsiteFiles', postData);
            console.log(buildSiteResult)
            if (postData["location"] !== '') {
                setStatus(buildSiteResult.data.statusCode);
            }
        }
        generateWebsiteFiles()
    }, [postData]);
    
    switch (templateName) {
        case 1:
            return <RestaurantForm bucketName={bucketName} setPostData={setPostData} status={status} templateName={templateName}/>
        case 2:
            return <AboutMeForm bucketName={bucketName} setPostData={setPostData} status={status} templateName={templateName}/>
        default:
            return <p>loading</p>
    }
}

export default SiteForm;


