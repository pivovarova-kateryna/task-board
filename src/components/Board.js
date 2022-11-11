import { Fragment, useCallback, useState, useEffect } from 'react';
import { dataset, getData } from '../api';
import './Board.css';
import Line from './Line';
import Search from './Search';


function Board() {
  const [boardData, setBoardData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    getData(setBoardData, setSearchData)
    setIsLoading(false)
  }, [])

  useEffect(() => {
      loadData()
    }, [loadData]    
  )

  const searchCardsHandler = (searchRequest) => {
    let searchResults = [];
    
    dataset.forEach((lane, index) => {
      searchResults.push({id: lane.id, title: lane.title, label: lane.label, cards: null})
      const foundCards = lane.cards.filter(card => card.title.toLowerCase().includes(searchRequest.toLowerCase())) 
      searchResults[index].cards = foundCards
    })
    
    setSearchData(searchResults)
  } 

  
  return (
    <Fragment>
      <Search setSearch={setIsSearching} onSearch={searchCardsHandler} updateBoard={setBoardData} />
      <div className="board-content">
        {isLoading && <p className='loader'>Loading...</p>}
        {boardData && !isLoading && !isSearching && boardData.map((lane, index) => 
          <Line 
            key={lane.id} 
            id={lane.id} 
            label={lane.label} 
            title={lane.title} 
            cards={lane.cards || []}
            index={index}
            updateBoard={setBoardData}
          />)
        }
        {!isLoading && isSearching && searchData.map((lane, index) => 
          <Line 
            key={lane.id} 
            id={lane.id} 
            label={lane.label} 
            title={lane.title} 
            cards={lane.cards || []}
            index={index}
            updateBoard={setBoardData}
          />)}
      </div>
    </Fragment>
  );
}

export default Board;
