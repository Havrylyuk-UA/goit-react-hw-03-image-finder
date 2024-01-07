import axios from 'axios';

export const fetchImages = async (searchWord, page, per_page) => {
  const response = await axios.get('https://pixabay.com/api', {
    params: {
      key: '40876862-5828b09b8a35d05d7759eed0a',
      q: searchWord,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: per_page,
      page: page,
    },
  });
  return response.data.hits;
};

export default {
  fetchImages,
};
