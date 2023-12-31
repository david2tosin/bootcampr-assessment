import './SignUp.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import signUpImage from 'assets/signupimg.svg'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasSymbol: boolean
}

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>()

  useEffect(() => {
    const passwordValue = watch('password')

    // Update conditions based on the current password value
    setValue('hasUpperCase', /[A-Z]/.test(passwordValue))
    setValue('hasLowerCase', /[a-z]/.test(passwordValue))
    setValue('hasSymbol', /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue))
  }, [watch('password'), setValue])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value

    setValue('password', newPasswordValue, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmit: SubmitHandler<FormData> = data => {
    // Add your signup logic here
    console.log('Form submitted:', data)
  }

  return (
    <div className='container'>
      <div>
        <h2>Join Bootcampr today.</h2>
        <h4>Get the experience. Get the job. </h4>
      </div>
      <div className='signup-container'>
        <img src={signUpImage} alt='register' />
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
          <label>
            First Name
            <input
              {...register('firstName', { required: 'This field is required' })}
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              {...register('lastName', { required: 'This field is required' })}
            />
          </label>
          <br />
          <label>
            Email address
            <input
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </label>
          {errors.email && (
            <p className='error-message'>{`${errors.email.message}`}</p>
          )}
          <br />

          <label>
            Password
            <input
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: {
                  hasUpperCase: value =>
                    /[A-Z]/.test(value) ||
                    'Password must contain at least one uppercase letter',
                  hasLowerCase: value =>
                    /[a-z]/.test(value) ||
                    'Password must contain at least one lowercase letter',
                  hasSymbol: value =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    'Password must contain at least one symbol',
                },
              })}
              type='password'
              onChange={handlePasswordChange}
            />
          </label>
          {errors.password && (
            <div className='error-messages'>
              <p
                className={
                  watch('hasUpperCase')
                    ? 'valid-condition'
                    : 'invalid-condition'
                }
              >
                1 uppercase
              </p>
              <p
                className={
                  watch('hasLowerCase')
                    ? 'valid-condition'
                    : 'invalid-condition'
                }
              >
                1 lowercase
              </p>
              <p
                className={
                  watch('hasSymbol') ? 'valid-condition' : 'invalid-condition'
                }
              >
                1 symbol
              </p>
              <p
                className={
                  errors.password.type === 'minLength'
                    ? 'invalid-condition'
                    : 'valid-condition'
                }
              >
                {errors.password.message}
              </p>
            </div>
          )}

          <br />
          <label>
            Re-enter password
            <input
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: value =>
                  value === watch('password') || 'Passwords do not match',
              })}
              type='password'
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <br />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}
