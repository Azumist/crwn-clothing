import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

// const TestPage = (props) => {
//   let params = useParams();
//   let location = useLocation();
//   let navigate = useNavigate();

//   console.log('params: ', params);
//   console.log('location: ', location);
//   console.log('navigate: ', navigate);
  
//   return (  
//     <div>
//       <h1>TEST PAGE</h1>
//       <Link to={`/${location.pathname}/details`}>To dynamic</Link>
//       <button onClick={() => navigate('/')}>Go to home</button>
//       <button onClick={() => navigate('/hats')}>Go to hats</button>
//       <button onClick={() => navigate(-1)}>Go back</button>
//     </div>
//   );
// };

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/signin' element={<SignInAndSignUp />} />
        </Routes>
      </div>
    );
  }
}

export default App;
