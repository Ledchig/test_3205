'use client'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { findUsers } from '@/src/app/actions'
import User from '@/src/app/components/User'
import { regExpEmail, regExpNumbers } from '@/src/shared/constants'
import { toMaskNumbers } from '@/src/shared/lib'
import Input from '@/src/shared/Ui/Input'
import Button from '@/src/shared/Ui/Button'

type Users = {
  email: string
  number: string
}[]

const Home = () => {
  const [users, setUsers] = useState<Users | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      number: '',
    },
  })
  console.log(watch('numbers'))
  console.log(toMaskNumbers(watch('numbers')))
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const number = data.number
      .split('')
      .filter((item: string) => item !== '-')
      .join('')
    const a = await findUsers(data.email, number)
    setUsers(a)
  }

  return (
    <main className="m-5 flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-10">
        <form
          className="flex flex-col justify-center gap-5 rounded-2xl border border-green-600 p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-5 text-center text-xl">Who are we looking for?</h2>
          <Input
            type="email"
            label="Email"
            value={watch('email')}
            placeholder="Enter email"
            error={errors.email}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: regExpEmail,
                message: 'Invalid email',
              },
            })}
          />
          <Input
            type="text"
            label="Numbers"
            placeholder="99-99-99"
            value={errors.number ? '' : toMaskNumbers(watch('number'))}
            error={errors.number}
            {...register('number', {
              pattern: {
                value: regExpNumbers,
                message: 'Only numbers',
              },
            })}
          />
          <Button className="mt-5" type="submit">
            Search
          </Button>
        </form>
        <div className="flex flex-col gap-5 rounded-2xl border border-green-600 p-10">
          <h2 className="border-b border-green-600 text-center text-xl font-medium">
            We found the following users:
          </h2>
          {users &&
            users.map(({ email, number }: { email: string; number: string }, index) => (
              <User key={index} email={email} number={number} />
            ))}
        </div>
      </div>
    </main>
  )
}

export default Home
