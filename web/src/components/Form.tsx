import { ComponentProps, FormEvent, useReducer } from 'react';
import { Input } from './Input';
import { MutationStatus } from 'src/types';

type ReducerPayload = {
  type: 'title' | 'description';
  payload: string;
};

type PostState = {
  title: string;
  description: string;
};

interface FormProps extends ComponentProps<'form'> {
  type: 'create' | 'edit';
  initialValues?: PostState;
  status: MutationStatus;
  onSubmitForm: (data: PostState) => void;
}

function postReducer(state: PostState, action: ReducerPayload) {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'description':
      return { ...state, description: action.payload };
  }
}

const INITIAL_POST_STATE = {
  title: '',
  description: '',
};

export function Form({
  type,
  initialValues = INITIAL_POST_STATE,
  status,
  onSubmitForm,
  ...rest
}: FormProps) {
  const [state, dispatch] = useReducer(postReducer, initialValues);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmitForm(state);
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-4" {...rest}>
      <label htmlFor="title" className="text-base-subtitle font-bold">
        Título
      </label>
      <Input
        type="text"
        id="title"
        name="title"
        value={state.title}
        onChange={e => dispatch({ type: 'title', payload: e.target.value })}
        required
      />
      <label htmlFor="desc" className="text-base-subtitle font-bold">
        Descrição
      </label>
      <textarea
        id="desc"
        name="desc"
        value={state.description}
        onChange={e =>
          dispatch({ type: 'description', payload: e.target.value })
        }
        required
        className="py-3 px-4 bg-base-input text-base-span border border-base-border rounded-md transition-colors outline-none focus-visible:ring-1 focus-visible:border-blue"
      />
      <button
        type="submit"
        className="py-2 px-4 bg-base-input text-base-span w-fit self-center rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
      >
        {status === 'loading'
          ? `${type === 'create' ? 'Criando' : 'Atualizando'}...`
          : status === 'error'
          ? 'Erro!'
          : status === 'success'
          ? `${type === 'create' ? 'Post criado!' : 'Post atualizado!'}`
          : `${type === 'create' ? 'Criar post' : 'Atualizar post'}`}
      </button>
    </form>
  );
}
