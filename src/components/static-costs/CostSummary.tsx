import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

interface CostSummaryProps {
  costs: {
    labour: { type: string; hourlyRate: number; hoursWorked: number };
    packaging: { type: string; costPerUnit: number; quantity: number };
    distribution: {
      mode: string;
      costPerDelivery: number;
      zone: string;
      additionalFees: number;
    };
    logistics: {
      mode: string;
      distance: number;
      transportCost: number;
      handlingFees: number;
    };
  };
}

export const CostSummary: React.FC<CostSummaryProps> = ({ costs }) => {
  const isLabourVisible =
    costs.labour.type ||
    costs.labour.hourlyRate > 0 ||
    costs.labour.hoursWorked > 0;

  const isPackagingVisible =
    costs.packaging.type ||
    costs.packaging.costPerUnit > 0 ||
    costs.packaging.quantity > 0;

  const isDistributionVisible =
    costs.distribution.mode ||
    costs.distribution.costPerDelivery > 0 ||
    costs.distribution.zone ||
    costs.distribution.additionalFees > 0;

  const isLogisticsVisible =
    costs.logistics.mode ||
    costs.logistics.distance > 0 ||
    costs.logistics.transportCost > 0 ||
    costs.logistics.handlingFees > 0;

  return (
    <Paper
      elevation={3}
      sx={{
        flex: "0 0 300px",
        backgroundColor: "#2A765F",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(250, 247, 226, 0.1)",
        height: "fit-content",
        color: "#FAF7E2",
        fontWeight: "600",
        padding: 2,
        maxWidth: "210px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1, color: "#FAF7E2" }}>
        Cost Summary
      </Typography>
      <Divider
        sx={{
          marginBottom: 2,
          borderColor: "rgba(250, 247, 226, 0.3)",
        }}
      />

      {isLabourVisible && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Labour Costs:
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            {costs.labour.type && `Type: ${costs.labour.type}`} <br />
            {costs.labour.hourlyRate > 0 &&
              `Hourly Rate: £${costs.labour.hourlyRate.toFixed(2)}`}{" "}
            <br />
            {costs.labour.hoursWorked > 0 &&
              `Hours Worked: ${costs.labour.hoursWorked}`}
          </Typography>
        </Box>
      )}

      {isPackagingVisible && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Packaging Costs:
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            {costs.packaging.type && `Type: ${costs.packaging.type}`} <br />
            {costs.packaging.costPerUnit > 0 &&
              `Cost Per Unit: £${costs.packaging.costPerUnit.toFixed(2)}`}{" "}
            <br />
            {costs.packaging.quantity > 0 &&
              `Quantity: ${costs.packaging.quantity}`}
          </Typography>
        </Box>
      )}

      {isDistributionVisible && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Distribution Costs:
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            {costs.distribution.mode && `Mode: ${costs.distribution.mode}`}{" "}
            <br />
            {costs.distribution.costPerDelivery > 0 &&
              `Cost Per Delivery: £${costs.distribution.costPerDelivery.toFixed(
                2
              )}`}{" "}
            <br />
            {costs.distribution.zone && `Zone: ${costs.distribution.zone}`}{" "}
            <br />
            {costs.distribution.additionalFees > 0 &&
              `Additional Fees: £${costs.distribution.additionalFees.toFixed(
                2
              )}`}
          </Typography>
        </Box>
      )}

      {isLogisticsVisible && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Logistics Costs:
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            {costs.logistics.mode && `Mode: ${costs.logistics.mode}`} <br />
            {costs.logistics.distance > 0 &&
              `Distance: ${costs.logistics.distance} km`}{" "}
            <br />
            {costs.logistics.transportCost > 0 &&
              `Transport Cost: £${costs.logistics.transportCost.toFixed(
                2
              )}`}{" "}
            <br />
            {costs.logistics.handlingFees > 0 &&
              `Handling Fees: £${costs.logistics.handlingFees.toFixed(2)}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
