import React, { useContext, useState } from "react";

const SearchContext = React.createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState(() =>
    parseInt(sessionStorage.getItem("childCount") || "1")
  );
  const [hotelId, setHotelId] = useState(
    () => sessionStorage.getItem("hotelID") || ""
  );

  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};

