import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const FetchSearchResults = ({ search_term }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tasks/search/${search_term}?page=1&page_size=10`);
        const data = await response.json();
        console.log("data", data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [search_term]);

  return (
    <Box sx={{margin:"10px auto", width:"90%"}}>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((search) => (
          <><Typography key={search.id}  >
                Task Title :{search.title}
            </Typography><Typography key={search.id} sx={{mb:2.5}}>
                   Under Room : {search.room.name}
                </Typography></>
        ))
      ) : (
        <Typography variant="body1">
          No search results found yet.
        </Typography>
      )}
    </Box>
  );
};

export default FetchSearchResults;
