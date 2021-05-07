import {
  guestbookEntry,
  selectedGuestbookEntry,
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
import Divider from "./Divider";

export default function ItemEntry(props) {
  const { imageUrl, entry, isSelected } = props;
  const { name } = entry;
  const date = new Date(props.entry._ts / 1000);

  const handleEntryClick = (e) => {
    e.preventDefault();
    props.setSelectedEntry(props.entry);
  };

  return (
    <>
      <div
        className={
          isSelected
            ? selectedGuestbookEntry.className
            : guestbookEntry.className
        }
        onClick={handleEntryClick}
      >
        <div className={guestbookEntryUserDetail.className}>
          <div className={guestbookEntryUserDetailAvatar.className}>
            <a href={"#"}>
              <img
                className={guestbookEntryUserDetailAvatarImg.className}
                src={imageUrl}
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
      <Divider />
      {guestbookEntry.styles}
      {selectedGuestbookEntry.styles}
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
