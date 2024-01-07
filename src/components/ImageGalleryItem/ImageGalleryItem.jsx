const ImageGalleryItem = ({ img, largeImg, alt }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={img} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
