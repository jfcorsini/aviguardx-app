import {
  guestbookEntry,
  guestbookEntryUserDetail,
  guestbookEntryUserDetailAvatar,
  guestbookEntryUserDetailAvatarImg,
  guestbookEntryUserDetailTimestamp,
  guestbookEntryStory,
  guestbookEntryShare,
  guestbookEntryShareTwitterButton,
  guestbookEntryShareTwitterButtonLogo1,
  guestbookEntryShareTwitterButtonLogo2,
} from "../styles/guestbookentry";

export default function GuestbookEntry(props) {
  const { map_url, name } = props;
  const date = new Date(props._ts / 1000);

  return (
    <>
      <div className={guestbookEntry.className}>
        <div className={guestbookEntryUserDetail.className}>
          <div className={guestbookEntryUserDetailAvatar.className}>
            <a href={`#`}>
              <img
                className={guestbookEntryUserDetailAvatarImg.className}
                src={map_url}
              />
            </a>
          </div>
        </div>
        <div className={guestbookEntryStory.className}>
          {name}
          <span className={guestbookEntryUserDetailTimestamp.className}>
            {date.toUTCString()}
          </span>
        </div>
      </div>
      {guestbookEntry.styles}
      {guestbookEntryShare.styles}
      {guestbookEntryShareTwitterButton.styles}
      {guestbookEntryShareTwitterButtonLogo1.styles}
      {guestbookEntryShareTwitterButtonLogo2.styles}
      {guestbookEntryStory.styles}
      {guestbookEntryUserDetail.styles}
      {guestbookEntryUserDetailAvatar.styles}
      {guestbookEntryUserDetailAvatarImg.styles}
      {guestbookEntryUserDetailTimestamp.styles}
    </>
  );
}
