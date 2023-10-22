import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
// import useSound from "use-sound";

const FranceMap = ({ data, toFind, clickedItems, setClickedItems }) => {
  const center = [46.64037232409269, 2.5651587672006486];
  const clickedItemsRef = useRef(clickedItems);
  const toFindRef = useRef(toFind);

  useEffect(() => {
    toFindRef.current = toFind;
  }, [toFind]);

  const checkIfItemIsClicked = (item) => {
    return clickedItemsRef.current.some(
      (clickedItem) => clickedItem.code === item.code
    );
  };

  const getItemColor = (item) => {
    const foundItem = clickedItemsRef.current.find(
      (clickedItem) => clickedItem.code === item.code
    );
    return foundItem ? foundItem.color : "#808080";
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: checkIfItemIsClicked(e.target.feature.properties)
        ? getItemColor(e.target.feature.properties)
        : "#006499",
      fillOpacity: 0.5,
    });
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: checkIfItemIsClicked(e.target.feature.properties)
        ? getItemColor(e.target.feature.properties)
        : "#808080",
      fillOpacity: 0.7,
    });
  };

  const handleClickOnItem = (item) => {
    const newData =
      item.code === toFindRef.current.code
        ? [...clickedItemsRef.current, { ...item, color: "#2ECC71" }]
        : [
            ...clickedItemsRef.current,
            { ...toFindRef.current, color: "#E74C3C" },
          ];

    clickedItemsRef.current = newData;
    setClickedItems(newData);
  };

  const onEachItem = (data, layer) => {
    layer.on({
      mouseover: (e) => {
        highlightFeature(e);
      },
      mouseout: (e) => {
        resetHighlight(e);
      },
      click: (e) => {
        handleClickOnItem(e.target.feature.properties);
      },
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=SngLj5RcHNMWSvq7xr1Q"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <GeoJSON
        data={data}
        onEachFeature={onEachItem}
        style={(feature) => ({
          fillColor: checkIfItemIsClicked(feature.properties)
            ? getItemColor(feature.properties)
            : "#808080",
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          color: "white",
        })}
      />
    </MapContainer>
  );
};

export default FranceMap;
