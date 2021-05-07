import ItemEntry from "./ItemEntry";
import { hero, sidebarContainer, heroEntries } from "../styles/hero";

export default function Sidebar(props) {
  const { entries, imageKey } = props;

  return (
    <div className={sidebarContainer.className}>
      <div className={heroEntries.className}>
        <h3>Latest Entries</h3>
        {!entries ? (
          <p>Loading entries...</p>
        ) : (
          entries.map((entry) => {
            return (
              <ItemEntry
                key={entry._id}
                entry={entry}
                imageUrl={entry[imageKey]}
                isSelected={
                  entry._id === (props.selectedEntry && props.selectedEntry._id)
                }
                setSelectedEntry={props.setSelectedEntry}
              />
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
