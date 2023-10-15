import { Form } from '@/Form';
import { GoBackButton } from '@/GoBackButton';
import { FormEvent, useReducer } from 'react';
import { useCreatePost } from 'src/hooks/useCreatePost';
import { usePosts } from 'src/hooks/usePosts';
import { postReducer } from 'src/reducers/postReducer';

const INITIAL_POST_STATE = {
  title: '',
  description: '',
};

export default function CreatePost() {
  const { refetch } = usePosts();
  const [createPost, status] = useCreatePost();
  const [state, dispatch] = useReducer(postReducer, INITIAL_POST_STATE);

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createPost(state);
    refetch();
  };

  return (
    <section className="space-y-4 mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <GoBackButton />

      <Form
        type="create"
        titleValue={state.title}
        descriptionValue={state.description}
        onChangeTitle={value => dispatch({ type: 'title', payload: value })}
        onChangeDescription={value =>
          dispatch({ type: 'description', payload: value })
        }
        onSubmit={handleCreatePost}
        status={status}
      />
    </section>
  );
}
