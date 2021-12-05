import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import getCountries from "./getCountries";

const MainApp = styled.main({
  alignItems: "center",
  background: "#f7f7f7",
  display: "flex",
  height: "100vh",
  justifyContent: "center",
});

const SearchableInputComponent = styled.div({
  position: "relative",
  width: "200px",
});

const SearchableLabel = styled.label(({ selectActive }) => ({
  position: "relative",
  display: "block",
  ":before": {
    background:
      Object.keys(selectActive).length > 0
        ? `center/cover no-repeat url('${selectActive.flag}')`
        : "",
    content: "''",
    height: "9px",
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "15px",
    zIndex: "6",
  },
  ":after": {
    background: "center/cover no-repeat url('/images/chevron.svg')",
    content: "''",
    height: "6px",
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "8px",
    zIndex: "6",
  },
}));

const SearchableInput = styled.input(({ selectActive }) => ({
  border: "2px solid #ccc",
  borderRadius: "4px",
  padding:
    Object.keys(selectActive).length > 0
      ? "8px 24px 8px 35px"
      : "8px 24px 8px 8px",
  width: "100%",
  zIndex: "5",
  "&:active": {
    outline: "none",
  },
  "&:focus": {
    borderColor: "blue",
    outline: "none",
  },
}));

const CountryList = styled.ul(({ active }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  boxShadow: "0 -2px 9px 0 rgba(0, 0, 0, 0.17)",
  display: active ? "block" : "none",
  listStyle: "none",
  margin: "0",
  maxHeight: "230px",
  overflowY: "scroll",
  padding: "0",
  position: "absolute",
  top: "36px",
  width: "100%",
  "-ms-overflow-style": "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const CountryListItem = styled.li(({ selectActive, country }) => ({
  alignItems: "center",
  backgroundColor:
    Object.keys(selectActive).length > 0 && country === selectActive.name
      ? "#E4F0FF"
      : "",
  color:
    Object.keys(selectActive).length > 0 && country === selectActive.name
      ? "blue"
      : "",
  display: "flex",
  padding: "12px",
  "&:hover": {
    color: "blue",
    cursor: "pointer",
    background: "#f9f9f9",
  },
}));

const Flag = styled.img({
  width: "15px",
  height: "9px",
});

const CountryName = styled.p({
  marginLeft: "10px",
});

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setAllCountries(data);
      setFilteredCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const filterCountries = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCountries.length === 0) {
      setFilteredCountries([{ name: "No Country Found", numericCode: "0" }]);
    } else if (Object.keys(selectedCountry).length > 0) {
      setFilteredCountries(allCountries);
    } else {
      setFilteredCountries(filterCountries);
    }
  }, [searchTerm, allCountries, selectedCountry]);

  const handleChangeSearchTerm = (e) => {
    const value = e.currentTarget.value;
    setSelectedCountry({});
    setSearchTerm(value);
  };

  const handleShowOptions = (e) => {
    setShowOptions(true);
  };

  const handleOnFocus = (e) => {
    e.currentTarget.placeholder = "Search";
  };

  const handleOnBlur = (e) => {
    e.currentTarget.placeholder = "Select";
  };

  const handleHideOptions = (e) => {
    if (e.target === e.currentTarget) {
      setShowOptions(false);
    }
  };

  const handleSelectCountry = (e) => {
    const name = e.currentTarget.children[1].innerText;
    const flag = e.currentTarget.children[0].src;

    setSearchTerm(name);
    setSelectedCountry({ name, flag });
    setShowOptions(false);
  };

  return (
    <MainApp className="App" onClick={handleHideOptions}>
      <GlobalStyles />
      <SearchableInputComponent>
        <SearchableLabel selectActive={selectedCountry}>
          <SearchableInput
            value={searchTerm}
            onClick={handleShowOptions}
            onChange={handleChangeSearchTerm}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder="Select"
            selectActive={selectedCountry}
          />
        </SearchableLabel>
        <CountryList active={showOptions}>
          {filteredCountries.length > 0 &&
            filteredCountries.map((country) => (
              <CountryListItem
                key={country.numericCode}
                onClick={handleSelectCountry}
                selectActive={selectedCountry}
                country={country.name}
              >
                {country.flags && (
                  <Flag src={country.flags.svg} alt={`${country.name} flag`} />
                )}
                <CountryName>{country.name}</CountryName>
              </CountryListItem>
            ))}
        </CountryList>
      </SearchableInputComponent>
    </MainApp>
  );
}

export default App;
