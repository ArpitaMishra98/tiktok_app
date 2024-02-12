'use client'
import { auth } from '@/firebase/config'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

const index = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const handleSignUp = () => {
    createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log({ res });
        sessionStorage.setItem('user', "true");
        setEmail('');
        setPassword('');
        router.push('/login');
        alert("Register Successfully")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box className="loginbox">
        <form className="loginForm">
          <Typography variant="h4" gutterBottom>
            Tiktok Register Form
          </Typography>
          <TextField type='email' label="Email" variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <TextField type='password' label="Password" variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Button variant='contained' size='small' color='secondary' onClick={handleSignUp}>Login</Button>
        </form>
      </Box>
    </>
  )
}

export default index