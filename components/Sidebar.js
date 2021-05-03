import ItemEntry from "./ItemEntry";
import Divider from "./Divider";
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
                <ItemEntry
                  entry={entry}
                  setSelectedEntry={props.setSelectedEntry}
                />
                {index < allEntries.length - 1 && <Divider />}
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
