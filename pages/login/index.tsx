'use client'
import { auth } from '@/firebase/config';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            sessionStorage.setItem('user', JSON.stringify(res?.user?.uid))
            sessionStorage.setItem('loginstatus', "true")
            setEmail('');
            setPassword('');
            alert("Login Sucessfully")
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    };
    return (
        <>
            <Box className="loginbox">
                <form className="loginForm">
                    <Typography variant="h4" gutterBottom>
                        Tiktok Login Form
                    </Typography>
                    <TextField type='email' label="Email" variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextField type='password' label="Password" variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button variant='contained' size='small' color='secondary'
                        onClick={handleSignIn}>Login</Button>
                </form>
            </Box>
        </>
    )
}

export default index