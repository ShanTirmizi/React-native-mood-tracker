import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const register = async () => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <KeyboardAvoidingView>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize='none' />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        {
          loading ?
            <Text>Loading...</Text> :
            <Text onPress={register} style={{ color: 'blue' }}>Register</Text>
        }
      </KeyboardAvoidingView>
    </View>
  )
}