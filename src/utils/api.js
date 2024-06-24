import axios, { AxiosError } from 'axios';
const encodedParams = new URLSearchParams();


const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': '15046a82b2msha81dce25ff3a111p167bbdjsn88de810c5296',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams,
};

function installParams(text, isReversed) {
    encodedParams.set('q', text);
    if(isReversed) {
      encodedParams.set('target', 'en');
      encodedParams.set('source', 'ru');
    } else {
      encodedParams.set('target', 'ru');
      encodedParams.set('source', 'en');
    }   
}


export async function translate(text, isReversed) {
    try {
        installParams(text, isReversed)
        const response = await axios.request(options);
        return response.data.data.translations
    } catch (error) {
        console.log(`Your request finished with status ${error.response.status}
        . Please check request limit. Message error: ${error.response.data.message}`);
        alert(`Check your request limit ${error.response.data.message}`)   
    }
}



 