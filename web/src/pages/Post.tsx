import arrowIcon from '../assets/arrow.svg';
import externalLinkIcon from '../assets/external-link.svg';
import calendarIcon from '../assets/calendar.svg';
import githubIcon from '../assets/github.svg';
import commentIcon from '../assets/comment.svg';
import { useNavigate, useParams } from 'react-router-dom';

const posts = [
  {
    id: '9ksiklRie',
    title: 'Maecenas ut Molestie',
    description: `Maecenas ut molestie ante. Ut a nisi nec dolor lacinia fringilla vel eget nibh. Pellentesque rutrum sem vel nulla sodales, sit amet pellentesque est faucibus. Nam sed congue sapien. Sed quis leo eget elit sagittis tempus. Vivamus pretium magna nisi, maximus molestie elit semper eget. Vivamus ac fermentum purus. Quisque sit amet eros augue. Nam vitae diam nec ante sodales pharetra. Pellentesque fringilla ultrices lectus, vel facilisis magna consectetur vitae. Vestibulum vehicula feugiat dolor, at congue felis blandit in. Integer quis accumsan libero. Praesent vitae mauris metus. Sed nec metus interdum, vulputate ex id, dictum sapien. Mauris ultrices fermentum dui quis aliquet."`,
  },
  {
    id: 'z_KxW3gE7',
    title: 'Nam Eget Leo',
    description: `Nam eget leo eget turpis mattis dignissim eget elementum ipsum. Nulla facilisi. Curabitur blandit condimentum nisi sed semper. Praesent eget dignissim tortor, non luctus diam. Pellentesque eu tempus orci. Aliquam erat volutpat. Donec ac egestas ipsum. Sed aliquam molestie eleifend. Suspendisse porttitor mauris eget odio porta, id cursus purus vestibulum. Donec dapibus volutpat ex et congue. Fusce semper justo id pellentesque dictum. Morbi vehicula nisi ac tellus cursus posuere. Pellentesque facilisis mauris neque. Nullam vitae vestibulum ipsum. Nunc volutpat nunc vitae risus bibendum interdum. Vestibulum sit amet libero tincidunt, sagittis velit at, lacinia elit."`,
  },
  {
    id: 'T0N2U78TU',
    title: 'Vestibulum Imperdiet ',
    description: `Vestibulum imperdiet ante sed metus aliquet consectetur. Phasellus sit amet leo metus. Curabitur blandit turpis leo, ac lacinia orci consectetur a. Ut non augue turpis. Nulla facilisi. Vivamus sed vehicula felis. Cras eget lacinia velit. Mauris tempor quis velit at bibendum. Quisque facilisis vel lacus nec maximus. Fusce egestas scelerisque bibendum. Ut auctor, velit in dictum dictum, justo felis rhoncus nisl, nec facilisis tortor est eu magna."`,
  },
  {
    id: '1tXLHzkL_',
    title: 'Mauris Fringilla Pellentesque',
    description: `Mauris fringilla pellentesque mattis. Phasellus et dolor eu eros vulputate ullamcorper elementum ac ex. Aenean mollis, enim nec interdum vestibulum, nibh dolor suscipit ante, vel fringilla enim nisl at lorem. Sed arcu erat, suscipit ac porttitor faucibus, malesuada non lacus. Quisque in nisi ante. Phasellus fringilla sapien et efficitur aliquet. Ut a justo non odio laoreet viverra id nec risus. Phasellus nunc dui, convallis eu leo sed, vehicula interdum nisl. Nam congue lectus nec urna fringilla aliquet. Maecenas molestie et lacus sit amet sollicitudin. Nulla sapien metus, volutpat nec imperdiet mollis, finibus ut neque. Morbi feugiat augue ut condimentum gravida."`,
  },
  {
    id: 'PHSU6wSdG',
    title: 'Quisque Dictum Massa',
    description: `Quisque dictum massa non sagittis ultricies. Curabitur placerat cursus lacus quis porta. Suspendisse vitae volutpat sapien. Nunc suscipit sodales enim mollis maximus. Nam vitae convallis diam, et ultrices nulla. Sed efficitur tortor accumsan lacinia tincidunt. Nunc laoreet arcu sapien, vel scelerisque leo auctor vel. Aenean egestas imperdiet interdum. Aliquam ac sagittis risus, at dignissim leo. Maecenas est ligula, tempus vitae iaculis et, euismod in eros. Ut scelerisque volutpat dolor, congue rutrum nisi dictum at. Phasellus sagittis odio sit amet nisi sodales tincidunt."`,
  },
  {
    id: '64bGnRbFK',
    title: 'Ut Elementum Euismod',
    description: `Ut elementum euismod dui nec malesuada. Aliquam pellentesque, nisl quis varius suscipit, purus justo dignissim neque, id molestie velit augue ut ipsum. Suspendisse potenti. Vivamus a pellentesque mauris. Phasellus viverra id nibh non congue. Integer volutpat enim quis libero hendrerit congue. Ut a ultricies justo. Cras in orci tempor, aliquam urna id, venenatis arcu."`,
  },
  {
    id: '6scR8hSiR',
    title: 'Etiam Viverra At Sapien',
    description: `Etiam viverra at sapien in volutpat. Morbi pellentesque consectetur diam ut pulvinar. Pellentesque eu lacinia mi, sit amet sagittis augue. Duis euismod venenatis justo in tristique. Duis aliquam mi tortor, id hendrerit diam tempor imperdiet. Morbi odio eros, tincidunt sed risus a, rutrum egestas elit. Quisque interdum fermentum erat ornare egestas. Pellentesque nibh leo, tincidunt auctor aliquam sed, porttitor eu neque. Nunc lorem massa, porta eget nisl in, bibendum molestie elit. Duis sit amet ligula purus. Curabitur vitae ultricies nunc, a interdum lectus."`,
  },
  {
    id: '0TtszxVeu',
    title: 'Integer Sed Augue Pretium',
    description: `Integer sed augue pretium ligula pulvinar rhoncus. Integer tempus at nunc ac efficitur. Donec at sodales odio, eu porta nunc. Sed tempor dui quis varius sollicitudin. Maecenas vehicula vehicula risus, sit amet elementum neque venenatis viverra. Quisque id mi finibus, viverra dui sed, malesuada ex. Pellentesque imperdiet, nulla id vehicula commodo, sem est tempus nunc, eget vestibulum quam tortor quis urna. Integer consectetur luctus lobortis. Nullam vel quam ex. Curabitur sagittis, ex in pharetra eleifend, lorem lectus pharetra arcu, ut posuere velit nunc in risus. Aliquam lacinia purus enim, ac rutrum magna dignissim vel. Proin at ex accumsan, malesuada nisl sit amet, tincidunt dui. Proin viverra vel velit in maximus. Duis ut neque pulvinar, lacinia sapien a, consequat neque. Phasellus sodales quam non arcu interdum sollicitudin quis vitae tortor."`,
  },
  {
    id: 'KfTV5mRjP',
    title: 'Sed Nisi Nisi',
    description: `Sed nisi nisi, placerat eget finibus ut, porttitor at sapien. Mauris ac magna vel enim auctor consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut a nulla sapien. Sed nec suscipit purus, non luctus magna. Praesent suscipit leo quis velit porttitor gravida. Vestibulum sem leo, rutrum eget lorem sed, lacinia hendrerit lacus. Aliquam id justo nisi."`,
  },
  {
    id: 'fz0vPXb3h',
    title: 'Sed Ut Semper Mi',
    description: `Sed ut semper mi. Maecenas dui diam, pharetra sed ex in, egestas sodales turpis. Vestibulum libero erat, mattis bibendum scelerisque ac, convallis a lorem. Proin mollis nunc turpis, in rutrum quam pulvinar vitae. Etiam tempor et neque ac feugiat. Fusce vitae ex sed justo aliquam tristique sed ac massa. Maecenas id felis imperdiet, aliquam quam vitae, lacinia urna. Aenean tempor fermentum metus, id ornare erat lacinia et."`,
  },
];

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const postData = posts.find(post => post.id === id);

  const handleGoBack = () => navigate(-1);

  return (
    <>
      <section className="py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow flex gap-8">
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-xs text-blue font-bold uppercase flex gap-2 hover:brightness-75 transition-colors"
              onClick={handleGoBack}
            >
              <img
                src={arrowIcon}
                alt="click here to go back"
                width={12}
                height={12}
              />{' '}
              voltar
            </button>
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

          <h1 className="text-2xl font-bold text-base-title">
            {postData?.title}
          </h1>

          <div className="mt-4 flex items-center gap-6">
            <div className="flex gap-1 items-center justify-center">
              <img src={githubIcon} alt="github" width={18} height={18} />
              <span className="text-base-subtitle">raphaeljcm</span>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img src={calendarIcon} alt="calendar" width={18} height={18} />
              <span className="text-base-subtitle">Há 1 dia</span>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <img src={commentIcon} alt="comments" width={18} height={18} />
              <span className="text-base-subtitle">5 comentários</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 px-8">
        <p className="text-base-text">{postData?.description}</p>
      </section>
    </>
  );
}
