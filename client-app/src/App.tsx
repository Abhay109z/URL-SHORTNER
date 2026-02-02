import Container from './components/container/container';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import FormContainer from './components/FormContainer.tsx/FormContainer';

const App: React.FunctionComponent = () => {
    return (
      <>
        <Header />
        <Container>
          <FormContainer />
        </Container>
        <Footer />
      </>
    );
};

export default App;
