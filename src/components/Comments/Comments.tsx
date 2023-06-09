import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import CommentItem from '../CommentItem/CommentItem'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getPostComments } from '../../api'
import styles from './Comments.module.scss'
import Error from '../Error/Error'

const Comments = () => {
  const params = useParams()
  const postId = Number(params.id)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getPostComments(postId),
  })

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <Error
        errorMsg='Something went wrong while loading the comments!'
        refetchFunc={refetch}
      />
    )
  }

  return (
    <fieldset className={styles['comments-container']}>
      <legend>Comments</legend>

      {data.length === 0 && <p>There are no comments yet!</p>}

      {data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </fieldset>
  )
}

export default Comments
