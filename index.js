const response = await axios.get(
  "https://jsearch.p.rapidapi.com/search",
  {
    params: {
      query: ${role} in ${location},
      page: 1,
      num_pages: 1
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
    }
  }
);
