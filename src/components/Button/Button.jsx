const Button = ({ handleAddPage }) => {
  return (
    <>
      <button className="Button" onClick={() => handleAddPage()}>
        Load more
      </button>
    </>
  );
};

export default Button;
