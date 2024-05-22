import axios from 'axios'


const newsData = () =>{
    const url = "http://localhost:4000/api/news"
    axios
        .get(url)
        .then(data=>console.log(data.data))
        .catch(error=>console.log(error))
}
export default newsData
