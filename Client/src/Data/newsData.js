import axios from 'axios'


const newsData = () =>{
    const url = "http://127.0.0.1:5000/getAllNews"
    axios
        .get(url)
        .then(data=>console.log(data.data))
        .catch(error=>console.log(error))
}
export default newsData
