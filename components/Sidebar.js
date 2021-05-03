import GuestbookEntry from "./GuestbookEntry";
import GuestbookEntryDivider from "./GuestbookEntryDivider";
import { hero, heroContainer, heroEntries } from "../styles/hero";

export default function Sidebar(props) {
  const { entries, errorMessage } = props;

  return (
    <div className={heroContainer.className}>
      <div className={heroEntries.className}>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : !entries ? (
          <p>Loading entries...</p>
        ) : (
          entries.map((entry, index, allEntries) => {
            return (
              <div key={entry._id}>
                <GuestbookEntry {...entry} />
                {index < allEntries.length - 1 && <GuestbookEntryDivider />}
              </div>
            );
          })
        )}
      </div>
      {heroEntries.styles}
      {heroContainer.styles}
      {hero.styles}
    </div>
  );
}
