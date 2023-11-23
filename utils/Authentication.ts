import { Toast } from "./Swal";
import Cookies from 'js-cookie';
import { NextRouter, useRouter } from "next/router";
import useSWR, { mutate } from "swr";


const fetcher = async (url: string) => {
    const res = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${Cookies.get('token_session')}`
        }
    })

    if (!res.ok) {
        const error: any = new Error('An error occurred while fetching the data.')

        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}
const sigInUser = async (email: string, password: string) => {
    if (email == '' || password == '') {
        Toast.fire({
            icon: 'error',
            title: 'All fields are required'
        })
        return false
    }
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData
    });

    if (response.status == 200) {
        const responseData = await response.json();
        Cookies.set('token_session', responseData.token)
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`)
    } else {
        const error = await response.json();
        Toast.fire({
            icon: 'error',
            title: error.message
        })
    }

}

const useUser = () => {

    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: false,
        revalidateOnMount: true
    });
    let userData = null;

    if (isLoading == false && error == undefined) {
        userData = data.user_session
    }


    return { userData, isLoading, error }
}

const signOutUser = async (router: NextRouter) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${Cookies.get('token_session')}`
        }
    });

    if (response.status == 200) {
        Cookies.remove('token_session');
        window.location.href = '/login'
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
        })
    }

}



export { useUser, sigInUser, signOutUser }