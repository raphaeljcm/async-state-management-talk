import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/Dialog';
import { GoBackButton } from '@/GoBackButton';
import { usePost } from 'src/hooks/usePost';
import { useDeletePost } from 'src/hooks/useDeletePost';

export default function Post() {
  const { id } = useParams();
  const { post, status, error } = usePost(id);
  const [deletePost, mutationStatus] = useDeletePost();

  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const handleDeletePost = async () => {
    if (!id) return;

    await deletePost(id);
    handleGoBack();
  };

  return (
    <>
      <section className="mt-10 px-8 flex flex-col gap-10">
        {status === 'loading' ? (
          <span className="text-base-subtitle">Loading...</span>
        ) : status === 'error' ? (
          <span className="text-base-subtitle">Error: {error}</span>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-base-title">
                {post.title}
              </h2>
              <GoBackButton />
            </div>

            <p className="text-base-text">{post.description}</p>

            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/edit-post/${post.id}`}
                className="py-2 px-4 bg-base-input text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
              >
                Editar post
              </Link>

              <Dialog>
                <DialogTrigger className="py-2 px-4 bg-base-post text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors">
                  Deletar Post
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Você tem certeza que deseja excluir o post?
                    </DialogTitle>
                    <DialogDescription>
                      Está ação não pode ser desfeita.
                    </DialogDescription>
                    <DialogFooter>
                      <button
                        type="button"
                        onClick={handleDeletePost}
                        className="py-2 px-4 bg-base-post text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
                      >
                        {mutationStatus === 'loading'
                          ? 'Deletando post...'
                          : mutationStatus === 'error'
                          ? 'Erro!'
                          : mutationStatus === 'success'
                          ? 'Post deletado!'
                          : 'Deletar post'}
                      </button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </section>
    </>
  );
}
