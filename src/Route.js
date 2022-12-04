import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Register, Home, NewsDetail } from './pages';

function AppRouter() {

  const access_token = useSelector(state => state.authData?.data?.data.access_token);
  console.log("auth", access_token);

  return (
    <BrowserRouter>
      <Routes>
        {access_token ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/details/:slug" element={<NewsDetail />} />
          </>
        ) : <Route path="" element={<Register />} />}

        <Route path='*' element={<p>No page found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter