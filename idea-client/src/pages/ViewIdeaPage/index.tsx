import { useParams } from 'react-router-dom'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams()
  return (
    <div>
      <h2>{ideaNick}</h2>
      <p>Description of idea 1...</p>
      <div>
        <p>text 1</p>
        <p>text 2</p>
        <p>text 3</p>
      </div>
    </div>
  )
}
