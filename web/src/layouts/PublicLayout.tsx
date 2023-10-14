import { Outlet } from 'react-router-dom';
import coverBg from '../assets/cover.png';

export function PublicLayout() {
  return (
    <div className="w-full max-w-[1440px] mx-auto font-nunito">
      <header>
        <img src={coverBg} alt="" />
      </header>

      <main className="px-[250px] relative -top-20">
        <Outlet />
      </main>
    </div>
  );
}
