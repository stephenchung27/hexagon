import firebase from 'firebase';
import 'firebase/firestore';

// Firebase Configuration
const config = {
  apiKey: "AIzaSyBvZHrRQMR2japi6ODVBqNYW_rUJyFyaCk",
  authDomain: "hexagon-highscores.firebaseapp.com",
  databaseURL: "https://hexagon-highscores.firebaseio.com",
  projectId: "hexagon-highscores",
  storageBucket: "",
  messagingSenderId: "91272525021"
};

const fb = firebase.initializeApp(config);
const highscores = fb.firestore().collection("highscores");

export const addHighscore = (name, time) => {
  highscores.add({
    name,
    time
  });
};

export const getHighscores = () => {
  return highscores.orderBy("time", "desc").limit(10).get();
}