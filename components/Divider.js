export default function Divider() {
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 10px;
          height: 1px;
          width: 80%;
          border-radius: 20px;
          border-color: rgba(50, 63, 203);
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}
