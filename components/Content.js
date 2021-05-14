import Header from "./Header";
import SelectedEntry from "./SelectedEntry";
import ImageTypeSelector from "./ImageTypeSelector";
import { contentContainer } from "../styles/content";

export default function Content(props) {
  const { entry, imageKey, setImageKey } = props;
  return (
    <div className={contentContainer.className}>
      <Header onStatusChange={props.onStatusChange} />
      <ImageTypeSelector imageKey={imageKey} setImageKey={setImageKey} />
      {entry && <SelectedEntry entry={entry} imageUrl={entry[imageKey]} />}
      {contentContainer.styles}
    </div>
  );
}
