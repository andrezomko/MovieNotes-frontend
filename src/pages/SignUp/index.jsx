import { useState } from 'react'
import { Container, Form, Background } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { api } from '../../service/api'
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi'


export function SignUp() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSignUp() {
    if (!name || !email || !password) {
       alert('Please, fill all the inputs!')
       return
    }


    if (!email) {
      alert('Please insert a valid e-mail!')
      return 
    }

    api
      .post('/users', { name, email, password })
      .then(() => {
        alert('user created with sucess')
        navigate(-1)
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message)
        } else {
         alert('Could not validate the user')
        }
      })
  }

  return (
    <Container>
      <Form>
        <h1>Movie Notes</h1>
        <p>App to save your favorite movies 🎬</p>
        <h2>Create your account!</h2>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        ></Input>
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        ></Input>

        <Button title="save" onClick={handleSignUp}></Button>
        <a
          onClick={() => {
            navigate(-1)
          }}
        >
          <FiArrowLeft />
          Back to login
        </a>
      </Form>
      <Background />
    </Container>
  )
}
