import { getFirestore } from "firebase/firestore";
import app from "./Firebase";


const Firestore = getFirestore(app)

export default Firestore