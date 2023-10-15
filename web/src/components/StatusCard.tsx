import externalLinkIcon from '../assets/external-link.svg';
import userGroupIcon from '../assets/user-group.svg';
import githubIcon from '../assets/github.svg';
import buildingIcon from '../assets/building.svg';
import { SearchPost } from './SearchPost';
import { Link } from 'react-router-dom';
import { usePosts } from 'src/hooks/usePosts';

export function StatusCard() {
  const { data, isLoading, isFetching } = usePosts();

  return (
    <section className="py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow flex flex-col gap-8">
      <div className="flex gap-8">
        <img
          src="https://github.com/raphaeljcm.png"
          alt="github profile"
          className="w-36 h-36 rounded-lg"
        />

        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-base-title">
              Raphael Marques
            </h1>
            <a
              href="https://github.com/raphaeljcm"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue font-bold uppercase flex gap-2 hover:brightness-75 transition-colors"
            >
              github{' '}
              <img
                src={externalLinkIcon}
                alt="click here to go to raphael's github"
                width={12}
                height={12}
              />
            </a>
          </div>

          <p className="text-base-text">
            Hey there! I&apos;m a Web Developer with a strong focus on frontend
            development, but I also assist with backend tasks when needed.
          </p>

          <div className="mt-4 flex items-center gap-6">
            <div className="flex gap-1 items-center justify-center">
              <img src={githubIcon} alt="github" width={18} height={18} />
              <span className="text-base-subtitle">raphaeljcm</span>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img src={buildingIcon} alt="building" width={18} height={18} />
              <span className="text-base-subtitle">SmarttBot</span>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img
                src={userGroupIcon}
                alt="user group"
                width={18}
                height={18}
              />
              <span className="text-base-subtitle">{`${
                isLoading || isFetching ? '...' : data?.length + ' publicações'
              }`}</span>
            </div>
            <Link
              className="text-base-subtitle border border-transparent p-2 rounded-lg hover:border hover:border-base-border hover:brightness-75 transition-colors"
              to="/"
            >
              Todas publicações
            </Link>
          </div>
        </div>
      </div>

      <SearchPost />
    </section>
  );
}
