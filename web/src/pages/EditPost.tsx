import { Form } from '@/Form';
import { GoBackButton } from '@/GoBackButton';
import { useParams } from 'react-router-dom';
import { usePost } from 'src/hooks/usePost';
import { useUpdatePost } from 'src/hooks/useUpdatePost';
import { PostData } from 'src/types';

export default function EditPost() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = usePost(id);
  const updatePostMutation = useUpdatePost();

  const handleEditPost = async (data: Omit<PostData, 'id'>) => {
    if (!id) return;

    updatePostMutation.mutate({ id, ...data });
  };

  return (
    <section className="space-y-4 mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <GoBackButton />

      {isLoading ? (
        <span className="text-base-subtitle">Loading...</span>
      ) : isError ? (
        <span className="text-base-subtitle">Error: {error.message}</span>
      ) : (
        <Form
          type="edit"
          initialValues={data}
          onSubmitForm={handleEditPost}
          status={updatePostMutation.status}
        />
      )}
    </section>
  );
}
