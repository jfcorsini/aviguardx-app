import { entryContainer, entryImg } from "../styles/entry";

export default function SelectedEntry(props) {
  const { entry } = props;

  return (
    <div className={entryContainer.className}>
      {entry.name}
      <img className={entryImg.className} src={entry.map_url} />
      {entryContainer.styles}
      {entryImg.styles}
    </div>
  );
}
