import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import FirebaseApp from "./Firebase";
import { Toast } from "./Swal";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Firestore from "./Firestore";
import FirebaseAdmin from "./FirebaseAdmin";


const auth = getAuth(FirebaseApp);




const sigInUser = async (email: string, password: string) => {
    if (email == '' || password == '') {
        Toast.fire({
            icon: 'error',
            title: 'All fields are required'
        })
        return false
    }

    await signInWithEmailAndPassword(auth, email, password).then(async () => {
        await setDoc(doc(Firestore, 'access_token', auth.currentUser?.uid as string), {
            valid_to: Date.now() + 300
        })
        Toast.fire({
            icon: 'success',
            title: 'Successfully signed in'
        })
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode == 'auth/invalid-login-credentials') {
            Toast.fire({
                icon: 'error',
                title: 'Invalid email or password'
            })
        }
        if (errorCode == 'auth/invalid-email') {
            Toast.fire({
                icon: 'error',
                title: 'Invalid email address'
            })
        }
        return false
    });
}

const useUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let initUserData: any = {}
                const userRef = doc(Firestore, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                initUserData = docSnap.data();

                updateToken(user.uid)

                initUserData.uid = user.uid
                setUserData(initUserData)
                setIsLoading(false)

            } else {
                setIsLoading(false)

            }

        })
    }, [])
    useEffect(() => {
        const inverval = setInterval(() => {
            updateToken(userData.uid)
        }, 290000)

        return () => {
            clearInterval(inverval)
        }
    }, [userData])


    return { userData, isLoading }
}
function updateToken(uid: string) {
    const accessTokenRef = doc(Firestore, 'access_token', uid);
    updateDoc(accessTokenRef, {
        valid_to: Date.now() + 300000,
    })
}
const signOutUser = async () => {
    await signOut(auth).then(() => {
        window.location.href = '/login'
    }).catch((err) => {
        console.log(err)
    })

}



export { auth, useUser, sigInUser, signOutUser }