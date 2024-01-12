const ImageGalleryItem = ({ img, largeImg, alt, showModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={img}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={() => showModal({ largeImg, alt })}
      />
    </li>
  );
};

export default ImageGalleryItem;
