import ItemEntry from "./ItemEntry";
import Divider from "./Divider";
import { hero, sidebarContainer, heroEntries } from "../styles/hero";

export default function Sidebar(props) {
  const { entries, errorMessage, imageKey } = props;

  return (
    <div className={sidebarContainer.className}>
      <div className={heroEntries.className}>
        <h3>Latest Entries</h3>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : !entries ? (
          <p>Loading entries...</p>
        ) : (
          entries.map((entry, index, allEntries) => {
            return (
              <div key={entry._id}>
                <ItemEntry
                  entry={entry}
                  imageUrl={entry[imageKey]}
                  setSelectedEntry={props.setSelectedEntry}
                />
                {index < allEntries.length - 1 && <Divider />}
              </div>
            );
          })
        )}
      </div>
      {heroEntries.styles}
      {sidebarContainer.styles}
      {hero.styles}
    </div>
  );
}
