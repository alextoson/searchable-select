const getCountries = async () => {
  const url = "https://restcountries.com/v2/all?fields=name,flags,numericCode";
  const fetchData = await fetch(url);

  if (fetchData.status !== 200) {
    throw new Error("something went wrong");
  }

  const data = await fetchData.json();
  return data;
};

export default getCountries;
