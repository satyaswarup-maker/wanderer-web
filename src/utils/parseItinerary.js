export const parseItinerary = (data) => {
  return {
    overview: data.overview || "",
    stops: data.stops.map((stop) => ({
      index: stop.index,
      name: stop.name,
      time: stop.time,
      desc: stop.desc,
      tip: stop.tip,
      lat: stop.lat,
      lng: stop.lng,
    })),
  };
};