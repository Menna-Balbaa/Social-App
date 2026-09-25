import { Alert, Button, DateField, FieldError, Input, ListBox, Select, Spinner, TextField } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, type RegisterSchemaType } from "../../lib/schema/auth.schema";
import { registerUser } from "../../services/auth.services";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { parseDate } from "@internationalized/date";

export default function Register() {

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const navigate = useNavigate()

  const { register, handleSubmit, control, formState: { isSubmitting, errors } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      "name": "",
      "username": "",
      "email": "",
      "dateOfBirth": "",
      "gender": "",
      "password": "",
      "rePassword": ""
    }
  })

  async function sendData(formData: RegisterSchemaType) {
    console.log(formData);

    setErrorMsg("");
    setSuccessMsg("")

    try {
      const response = await registerUser(formData)
      console.log(response);
      setSuccessMsg("Account Registered Successfully ✅")
      toast.success(response.data.message)
      setTimeout(() => {
        navigate("/auth/login")
      }, 1500
      )
    } catch (error: any) {
      console.log(error.response);
      const userNameError = error.response.data.message.includes("username") ? "Username must contain letters and numbers only." : ""
      const passwordError = error.response.data.message.includes("password") ? "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character." : ""
      const emailError = error.response.data.message.includes("exists") ? "Email is already registered." : ""

      setErrorMsg(`${userNameError} \n${passwordError}\n${emailError}`);

      toast.error("Error Occured");
    }
  }

  return (
    <>
      <main className="w-full">
        <h1 className="font-bold text-2xl">Create a new account</h1>
        <p className="text-gray-500 text-[14px]">It is quick and easy.</p>
        <form className="space-y-3.5 mt-5" onSubmit={handleSubmit(sendData)}>
          <TextField aria-label='name' isInvalid={Boolean(errors.name)}>
            <Input {...register("name")} aria-label="name" className="w-full" placeholder="Name" />
            
            <FieldError>{errors.name?.message}</FieldError>
          </TextField>
          <TextField aria-label='userName' isInvalid={Boolean(errors.username)}>
            <Input  {...register("username")} aria-label="userName" className="w-full" placeholder="Username" />
            <FieldError>{errors.username?.message}</FieldError>

          </TextField>

          <TextField aria-label='email' isInvalid={Boolean(errors.email)}>
            <Input {...register("email")} aria-label="email" type='email' className="w-full" placeholder="Email Address" />
            <FieldError>{errors.email?.message}</FieldError>

          </TextField>

          <Controller name="gender" control={control} render={({ field }) => {
            return <>

              <Select aria-label="gender" className="w-full" placeholder="Select Gender" value={field.value}
                isInvalid={Boolean(errors.gender)}
                onChange={field.onChange} onBlur={field.onBlur} >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="male" textValue="male">
                      Male
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="female" textValue="female">
                      Female
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                  </ListBox>
                </Select.Popover>
                <FieldError>{errors.gender?.message}</FieldError>

              </Select>

            </>
          }}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DateField
                aria-label="dateOfBirth"
                className="w-full"
                value={field.value ? parseDate(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toString() : "")}
                isInvalid={Boolean(errors.dateOfBirth)}
                onBlur={field.onBlur}
              >
                <DateField.Group>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                </DateField.Group>

                <FieldError>{errors.dateOfBirth?.message}</FieldError>
              </DateField>
            )}
          />

          <TextField aria-label='password' isInvalid={Boolean(errors.password)}>
            <Input {...register("password")} aria-label="password" type='password' className="w-full" placeholder='Password' />
            <FieldError>{errors.password?.message}</FieldError>

          </TextField>

          <TextField aria-label='confirmPassword' isInvalid={Boolean(errors.rePassword)}>
            <Input {...register("rePassword")} aria-label="confirmPassword" type='password' className="w-full" placeholder='Confirm Password' />
            <FieldError>{errors.rePassword?.message}</FieldError>

          </TextField>
          <Button type="submit" className="rounded-lg w-full bg-main font-bold py-6 text-lg">{isSubmitting ? <span className='flex justify-center items-center gap-1'><Spinner className='text-white' />Loading...</span> : "Create New Account"}</Button>
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
