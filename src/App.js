import { useState, useEffect, createContext,useCallback  } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';



export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [invitation, setInvitation] = useState([]);
  const [sendInvitation, setSendInvitation] = useState(false);
  const [page, setPage] = useState();
  const [pageCount, setPageCount] = useState()

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
        setPageCount(res.total_pages)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error')
      }).finally(setIsLoading(false))

  }, [page]);

  const onSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const onInvitation = useCallback((id) => {
    if (invitation.includes(id)) {
      setInvitation((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvitation((prev) => [...prev, id]);
    }

  });
  const onSendInvitation = () => {
    setSendInvitation(true)
  }

  const onPaginationCount = (number) => {
    setPage(number)
  }
  return (
    <div className="App">
      <AppContext.Provider value={{
        onPaginationCount,
        pageCount,
        onInvitation,
        
      }}>
        {
          sendInvitation
            ?
            <Success count={invitation.length} />
            :
            <Users
              items={users}
              search={search}
              onSearch={onSearch}
              isLoading={isLoading}
              invitation={invitation}
              onSendInvitation={onSendInvitation}
            />
        }
      </AppContext.Provider>
    </div>
  );
}

export default App;
