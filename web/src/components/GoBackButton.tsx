import arrowIcon from '../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

export function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <button
      type="button"
      className="text-xs text-blue font-bold uppercase flex gap-2 hover:brightness-75 transition-colors"
      onClick={handleGoBack}
    >
      <img src={arrowIcon} alt="click here to go back" width={12} height={12} />{' '}
      voltar
    </button>
  );
}
