import { format } from 'date-fns'
import { createPost } from '../../../lib/posts'

export default async function handler(req, res) {
  const { id, title, content } = req.body
  await createPost(id, title, format(new Date(), 'yyyy-mm-dd'), content)
  res.status(200).json({ message: 'success' })
}
