import { Outlet } from 'react-router-dom';
import coverBg from '../assets/cover.png';

export function PublicLayout() {
  return (
    <div className="h-screen w-full max-w-[1440px] mx-auto">
      <header>
        <img src={coverBg} alt="" />
      </header>

      <main className="px-[288px] relative -top-20">
        <Outlet />
      </main>
    </div>
  );
}
