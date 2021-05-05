const imageKeyOptions = [
  {
    key: "map_url",
    value: "Map",
  },
  {
    key: "tracked_url",
    value: "Tracked Image",
  },
  {
    key: "predicted_url",
    value: "Predicted",
  },
  {
    key: "simple_tracked_url",
    value: "Simple",
  },
];

export default function ImageTypeSelector(props) {
  const { imageKey, setImageKey } = props;

  return (
    <div>
      {imageKeyOptions.map(({ key, value }) => (
        <>
          <label>
            <input
              key={key}
              type="radio"
              value={key}
              name="imageKey"
              onChange={(e) => setImageKey(e.target.value)}
              checked={imageKey === key}
            />
            {value}
          </label>
        </>
      ))}
    </div>
  );
}
