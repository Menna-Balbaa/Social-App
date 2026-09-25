import { Alert, Button, FieldError, Input, Spinner, TextField } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchemaType } from '../../lib/schema/auth.schema';
import { loginUser } from '../../services/auth.services';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router';
import { authContext } from '../../components/context/AuthContext';


export default function Login() {

  const { setToken } = useContext(authContext)!
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const navigate = useNavigate()
   
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function sendData(formData: LoginSchemaType) {
    console.log(formData);

    setErrorMsg("")
    setSuccessMsg("")
    try {
      const response = await loginUser(formData)
      console.log(response);
      setSuccessMsg("Account Logged in Successfully ✅")
      toast.success("Logged in")

      setTimeout(() => {
        localStorage.setItem("userToken", response.data.data.token)
        setToken(response.data.data.token)
        navigate("/")
      }, 1500);
    } catch (error: any) {
      console.log(error.response);
      setErrorMsg("Incorrect email or password ❌")
      toast.error("Error Occured")
    }
  }

  return (
    <>
       <main className="w-full">
        <h1 className="font-bold text-2xl">Log in to Route Posts</h1>
        <p className="text-gray-500 text-[14px]">Log in and continue your social journey.</p>
        <form className="space-y-3.5 mt-5" onSubmit={handleSubmit(sendData)}>
     
          <TextField aria-label='email' isInvalid={Boolean(errors.email)}>
            <Input {...register("email")} aria-label="email" type='email' className="w-full" placeholder="Email Address" />
            <FieldError>{errors.email?.message}</FieldError>

          </TextField>

          <TextField aria-label='password' isInvalid={Boolean(errors.password)}>
            <Input {...register("password")} aria-label="password" type='password' className="w-full" placeholder='Password' />
            <FieldError>{errors.password?.message}</FieldError>

          </TextField>

          <Button type="submit" className="rounded-lg w-full bg-main font-bold py-6 text-lg">{isSubmitting ? <span className='flex justify-center items-center gap-1'><Spinner className='text-white' />Loading...</span> : "Login"}</Button>
          {errorMsg && <Alert className='bg-red-100' status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{errorMsg}</Alert.Title>
            </Alert.Content>
          </Alert>}
          {successMsg && <Alert className='bg-green-100' status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{successMsg}</Alert.Title>
            </Alert.Content>
          </Alert>}

        </form>
      </main>
    </>
  )
}
