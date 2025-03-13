import { useState, useRef } from 'react';
import './App.css';
import { ItemList } from '~/components/ItemList';
import { Listing } from '~/components/Listing';

function App() {
  // reload ItemList after Listing complete
  const [reload, setReload] = useState(true);
  const [keyword, setKeyword] =useState(" ");
  const InputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () =>{
    setKeyword(InputRef.current?.value.toLowerCase() ?? '');
  };

  return (
    <div className='TitleDiv'>
      <header className="Title">
        <p>
          <b>Simple Mercari</b>
        </p>
      </header>
      <div className='ListingBody'>
        <Listing onListingCompleted={() => setReload(true)} /> 
        <h2 className="search-header">Search</h2>
        <input ref={InputRef} type='text' placeholder='Search'/>
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div>
        <ItemList reload={reload} onLoadCompleted={() => setReload(false)} keyword={keyword} />
      </div>
    </div>
  );
}

export default App;
