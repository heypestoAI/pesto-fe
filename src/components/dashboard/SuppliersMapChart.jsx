import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const SuppliersMapChart = ({ suppliersData }) => {
    console.log(suppliersData, "suppliersData");
    const uniqueCountries = [...new Set(suppliersData.map(item => item["Sourcing Geography"]))];
    console.log(uniqueCountries, "uniqueCountries");

  return (
    <div style={{ width: "100%", height: "400px" }}>
        <h2>Sales Mapping by Country</h2>
         <ComposableMap>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            const isHighlighted = uniqueCountries.includes(geo.properties.name) ||
                                  uniqueCountries.includes(geo.properties.ADMIN);
            
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isHighlighted ? "#4338ca" : "#D6D6DA"}
                stroke="#FFFFFF"
                strokeWidth={0.5}
                style={{
                  hover: {
                    fill: isHighlighted ? "#3730a3" : "#D6D6DA",
                    outline: "none"
                  }
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default SuppliersMapChart; 