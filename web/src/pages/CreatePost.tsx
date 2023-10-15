import { Form } from '@/Form';
import { GoBackButton } from '@/GoBackButton';
import { useCreatePost } from 'src/hooks/useCreatePost';
import { usePosts } from 'src/hooks/usePosts';
import { CreatePostPayload } from 'src/types';

export default function CreatePost() {
  const { refetch } = usePosts();
  const [createPost, status] = useCreatePost();

  const handleCreatePost = async (data: CreatePostPayload) => {
    await createPost(data);
    refetch();
  };

  return (
    <section className="space-y-4 mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <GoBackButton />

      <Form type="create" onSubmitForm={handleCreatePost} status={status} />
    </section>
  );
}
