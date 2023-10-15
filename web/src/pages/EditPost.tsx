import { Form } from '@/Form';
import { GoBackButton } from '@/GoBackButton';
import { FormEvent, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from 'src/hooks/usePost';
import { useUpdatePost } from 'src/hooks/useUpdatePost';
import { postReducer } from 'src/reducers/postReducer';

const INITIAL_POST_STATE = {
  title: '',
  description: '',
};

export default function EditPost() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_POST_STATE);
  const { id } = useParams();

  const { post, status, error } = usePost(id);
  const [updatePost, mutationStatus] = useUpdatePost();

  const handleEditPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) return;

    updatePost({ id, ...state });
  };

  useEffect(() => {
    if (!post) return;

    dispatch({ type: 'title', payload: post.title });
    dispatch({ type: 'description', payload: post.title });
  }, [post]);

  return (
    <section className="space-y-4 mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <GoBackButton />

      {status === 'loading' ? (
        <span className="text-base-subtitle">Loading...</span>
      ) : status === 'error' ? (
        <span className="text-base-subtitle">Error: {error}</span>
      ) : (
        <Form
          type="edit"
          titleValue={state.title}
          descriptionValue={state.description}
          onChangeTitle={value => dispatch({ type: 'title', payload: value })}
          onChangeDescription={value =>
            dispatch({ type: 'description', payload: value })
          }
          onSubmit={handleEditPost}
          status={mutationStatus}
        />
      )}
    </section>
  );
}
