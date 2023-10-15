type ReducerPayload = {
  type: 'title' | 'description';
  payload: string;
};

type PostState = {
  title: string;
  description: string;
};

export function postReducer(state: PostState, action: ReducerPayload) {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'description':
      return { ...state, description: action.payload };
  }
}
