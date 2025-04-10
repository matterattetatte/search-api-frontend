import { useState, useEffect, useCallback } from 'react'

function App() {
  const [searchText, setSearchText] = useState('')
  const [productIndex, setProductIndex] = useState(0)
  const [searchResults, setSearchResults] = useState([])


  const onSearch = useCallback(() => {
    if (searchText) {
      fetch(`https://www.googleapis.com/customsearch/v1?start=${productIndex}&num=10&q=${searchText}&key=AIzaSyCC1zS0TWmdbDDcKezDeZKxOL3ITEGPZlU&cx=b342350a5bed74566`).then(x => x.json()).then(res => {
        setSearchResults(res.items || [])
      })
    }
  }, [searchText, productIndex])

  const onPagination = (change) => {
    setProductIndex(productIndex + change)
  }

  useEffect(() => { 
    onSearch()
  }, [onSearch])

  return (
    <center>
      <div className="mb2 mt4">
        <input className="bg-grey" placeholder="Search for products" value={searchText} onChange={(e) => setSearchText(e.target.value)} ></input>
      </div>
      {searchResults.length > 0 && (
        <div className="mb2">
          {productIndex > 0 && <button onClick={() => onPagination(-10)}>
            {'<'}
          </button>}
          <button onClick={() => onPagination(10)}>
            {'>'}
          </button>
        </div>
      )}
      {searchResults.map((r) => {
        
        // console.log('rr', r)
        return (
        <div className="center mw6 bg-grey shadow-5 pa4 mb2 br4" key={r.link}>
          <img src={r.pagemap.cse_thumbnail[0].src} alt="img" />
          <div>
            <strong>
              {r.title}
              </strong>
              <br />
              <p>
                {r.snippet}
              </p>
              <br />
            <a target="_blank" href={r.link} rel="noreferrer"> Take me to product</a>
          </div>
        </div>
      )})}
    </center>
  );
}

export default App;
