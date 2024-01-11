import axios from 'axios';

export const fetchImages = async (searchWord, page, per_page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=40876862-5828b09b8a35d05d7759eed0a&q=${encodeURIComponent(
      searchWord
    )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
  );
  return response.data;
};

const api = {
  fetchImages,
};

export default api;
