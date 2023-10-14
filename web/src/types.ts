export type PostData = {
  id: string;
  title: string;
  description: string;
};

export type Status = 'loading' | 'error' | 'success';

export type MutationStatus = 'loading' | 'error' | 'success' | 'idle';
