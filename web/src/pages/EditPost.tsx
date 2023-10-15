import { Form } from '@/Form';
import { GoBackButton } from '@/GoBackButton';
import { useParams } from 'react-router-dom';
import { usePost } from 'src/hooks/usePost';
import { useUpdatePost } from 'src/hooks/useUpdatePost';
import { PostData } from 'src/types';

export default function EditPost() {
  const { id } = useParams();

  const { post, status, error } = usePost(id);
  const [updatePost, mutationStatus] = useUpdatePost();

  const handleEditPost = async (data: Omit<PostData, 'id'>) => {
    if (!id) return;

    updatePost({ id, ...data });
  };

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
          initialValues={post}
          onSubmitForm={handleEditPost}
          status={mutationStatus}
        />
      )}
    </section>
  );
}
