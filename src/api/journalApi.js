
import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demos-755f5-default-rtdb.firebaseio.com",
});

export default journalApi;