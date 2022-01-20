import axios from 'axios';

const KEY = '22840960-ea2b07fd8d407a17e77cd52c1';
const BASE_URL = 'https://pixabay.com/api';

export async function getImages(query, page) {
  const response = await axios.get(
    `${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`,
  );
  return response;
}
