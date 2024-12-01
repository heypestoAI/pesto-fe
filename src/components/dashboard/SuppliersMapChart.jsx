import { Box, Tooltip } from "@mui/material";
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import features from "./features.json";

const SuppliersMapChart = ({ suppliersData }) => {
    const uniqueCountries = [...new Set(suppliersData.map(item => item["Sourcing Geography"]))];

  return (
    <div style={{ height: "auto" }}>
      <h2>Supplier Mapping by Country</h2>
      <Box sx={{ width: "80%", height: "auto", mt: -6, mb: -14, ml:"auto", mr:"auto" }}>
        <ComposableMap>
          <Geographies geography={features}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = uniqueCountries.includes(geo.properties.name) ||
                                      uniqueCountries.includes(geo.properties.ADMIN);
                                      const countryName = geo.properties.name;
                
                return (
                  <Tooltip title={countryName} key={geo.rsmKey}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#81C784" : "#D6D6DA"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      hover: {
                        fill: isHighlighted ? "#4CAF50" : "#D6D6DA",
                        outline: "none"
                      }
                    }}
                  />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
    </div>
  );
};

export default SuppliersMapChart; 