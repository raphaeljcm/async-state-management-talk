import { ComponentProps } from 'react';
import { Input } from './Input';
import { MutationStatus } from 'src/types';

interface FormProps extends ComponentProps<'form'> {
  type: 'create' | 'edit';
  titleValue: string;
  descriptionValue: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  status: MutationStatus;
}

export function Form({
  type,
  titleValue,
  descriptionValue,
  status,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
  ...rest
}: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" {...rest}>
      <label htmlFor="title" className="text-base-subtitle font-bold">
        Título
      </label>
      <Input
        type="text"
        id="title"
        name="title"
        value={titleValue}
        onChange={e => onChangeTitle(e.target.value)}
        required
      />
      <label htmlFor="desc" className="text-base-subtitle font-bold">
        Descrição
      </label>
      <textarea
        id="desc"
        name="desc"
        value={descriptionValue}
        onChange={e => onChangeDescription(e.target.value)}
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
