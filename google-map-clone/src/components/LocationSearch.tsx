import { Fragment, useState } from "react";
import type { Place } from "../api/Place";
import { Search } from "../api/Search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}
function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setplaces] = useState<Place[]>([]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await Search(term);
    setplaces(results);
  };
  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:border-indigo-500"
          type="text"
          id="term"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </form>
      <h1 className="font-bold mt-6">Found Locations</h1>
      <div className="mt-2 grid grid-cols-[1fr_40px] items-center gap-2">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button
                className="py-1 px-1 bg-blue-500 text-xs text-white font-bold rounded"
                onClick={() => onPlaceClick(place)}
              >
                GO!
              </button>
              <div className="border-b w-full col-span-2"></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
export default LocationSearch;
