import { Container, Content } from './styles'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { api } from '../../service/api'


export function Create() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [description, setDescriptions] = useState('')
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState('')

  function handleAddTag() {
    setTags(prevState => [...prevState, newTags])
    setNewTags('')
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      alert('You forgot the title')
    }
    if (rating < 0 || rating > 5) {
      return alert('The grade must be from 0 to 5!')
    } else if (!rating) {
      return  alert('You need to grade your movie')
    }
    if (!description) {
      return alert('You forgot the description')
    }
    if (newTags) {
      return alert('You forgot to add a tag, please do it!')
    }
    if (tags.length <= 0) {
      return alert('You forgot the tags!')
    }

    await api.post('/notes', {
      title,
      rating,
      description,
      tags
    })
    alert('Movie created!',)
    navigate(-1)
  }

  return (
    <Container>
      <Header></Header>

      <main>
        <a onClick={() => navigate(-1)}>
          <ButtonText icon={RiArrowLeftLine} title="Back"></ButtonText>
        </a>
        <section>
          <Content>
            <h1>New Movie</h1>
            <div>
              <Input
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
              ></Input>
              <Input
                placeholder="Grade (0 to 5) 🤔"
                type="number"
                min="0"
                max="5"
                onChange={e => setRating(e.target.value)}
              ></Input>
            </div>
            <Textarea
              placeholder="Description"
              onChange={e => setDescriptions(e.target.value)}
            ></Textarea>

            <h2>Tags (Action, Drama...)</h2>
            <div className="note-content">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag)
                  }}
                ></NoteItem>
              ))}
              <NoteItem
                isNew
                placeholder="New Tag"
                value={newTags}
                onChange={e => setNewTags(e.target.value)}
                onClick={handleAddTag}
              ></NoteItem>
            </div>

            <Button title="Save" onClick={handleNewNote}></Button>
          </Content>
        </section>
      </main>
    </Container>
  )
}
