import { initializeApp } from 'firebase/app'
import { getDatabase, ref, update, get, onValue } from 'firebase/database' // ✅ Add `onValue`

const firebaseConfig = {
  apiKey: 'AIzaSyDUA5PKQZzdEIOA2AaQNwK6CdbKrZtRUbs',
  authDomain: 'dxf-file-generation.firebaseapp.com',
  databaseURL: 'https://dxf-file-generation-default-rtdb.firebaseio.com/',
  projectId: 'dxf-file-generation',
  storageBucket: 'dxf-file-generation.appspot.com',
  messagingSenderId: '596898415906',
  appId: '1:596898415906:web:222094667d6d452f7e117b',
  measurementId: 'G-BHH8QE0K91',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database, ref, update, get, onValue } // ✅ Export `onValue`
