import firebase from "firebase/app";
import database from "firebase/app";


const firebaseConfig = {
    apiKey: 'AIzaSyCt3l6IKuyFrlTsz64AHO8PYs25JzcHdMM',
    databaseURL: 'https://meet-clone-13a3d-default-rtdb.firebaseio.com/' ,
};

firebase.initializeApp(firebaseConfig);

let dbRef = firebase.database().ref();

export const useName = prompt("What's Your Name?");

const uriParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("id");

if(roomId){
    dbRef = dbRef.child(roomId);
}else{
    dbRef = dbRef.push();
    window.history.replaceState(nill,"Meet","?id=" + dbRef.key());
}

export default dbRef;