import { Container } from './styles'
import { Input } from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { api } from '../../service/api'
import no_avatar from '../../assets/no_avatar.svg'

export function Header({ onChange, ...rest }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : no_avatar

  return (
    <Container>
      <div className="header">
        <h1>Movie Notes</h1>
        <Input placeholder="Title search" onChange={onChange} />
        <div className="profile">
          <div>
            <a
              onClick={() => {
                navigate('/profile')
              }}
            >
              {user.name}
            </a>
            <a onClick={signOut}>exit</a>
          </div>
          <a
            onClick={() => {
              navigate('/profile')
            }}
          >
            <img src={avatarUrl} alt="User Image" />
          </a>
        </div>
      </div>
    </Container>
  )
}
