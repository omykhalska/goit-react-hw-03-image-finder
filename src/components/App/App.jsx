import Searchbar from '../Searchbar/';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import { Container } from './App.styled';

function App() {
  return (
    <Container>
      <Searchbar />
      <ImageGallery />
      <Button />
    </Container>
  );
}

export default App;
