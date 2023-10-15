export type PostData = {
  id: string;
  title: string;
  description: string;
};

export type Status = 'loading' | 'error' | 'success';

export type MutationStatus = 'loading' | 'error' | 'success' | 'idle';

export type CreatePostPayload = {
  title: string;
  description: string;
};

export type UpdatePostPayload = {
  id: string;
  title: string;
  description: string;
};
