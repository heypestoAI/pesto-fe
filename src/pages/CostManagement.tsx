import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { ChevronRight as ChevronDown } from "@mui/icons-material";
import { ProductSelector } from "../components/static-costs/ProductSelector";
import { LabourCosts } from "../components/static-costs/LabourCosts";
import { PackagingCosts } from "../components/static-costs/PackagingCosts";
import { DistributionCosts } from "../components/static-costs/DistributionCosts";
import { LogisticsCosts } from "../components/static-costs/LogisticsCosts";
import { styles } from "../components/static-costs/styles";
import { Product } from "../types/static-costs";
import { CostSummary } from "../components/static-costs/CostSummary";

const mockProducts: Product[] = [
  { id: "1", name: "Product A", frequency: 10 },
  { id: "2", name: "Product B", frequency: 5 },
  { id: "3", name: "Product C", frequency: 2 },
];

const CostManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | false>(
    "labour"
  );
  const [productSize, setProductSize] = useState<number>(0);
  const [productUnit, setProductUnit] = useState<string>("units");
  const [costs, setCosts] = useState({
    labour: { type: "", hourlyRate: 0, hoursWorked: 0 },
    packaging: { type: "", costPerUnit: 0, quantity: 0 },
    distribution: { mode: "", costPerDelivery: 0, zone: "", additionalFees: 0 },
    logistics: { mode: "", distance: 0, transportCost: 0, handlingFees: 0 },
  });

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSection(isExpanded ? panel : false);
    };

  const handleCostChange = (
    section: string,
    field: string,
    value: string | number
  ) => {
    setCosts((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = (isDraft: boolean = false) => {
    console.log("Saving costs:", JSON.stringify(costs, null, 2));
    // toast({
    //   title: isDraft ? "Progress Saved" : "Costs Submitted",
    //   description: isDraft
    //     ? "Your progress has been saved as a draft."
    //     : "Cost details have been successfully submitted.",
    // });
  };

  return (
    <Box
      sx={{ background: "linear-gradient(145deg, #2A765F 0%, #1a4d3d 100%)" }}
    >
      <Container sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant="h4" sx={styles.title}>
            Cost Entry: Labour, Packaging, Distribution, and Logistics
          </Typography>
          <Typography variant="subtitle1" sx={styles.subtitle}>
            Input and manage your cost components for accurate product costing
          </Typography>
        </Box>

        <ProductSelector
          products={mockProducts}
          selectedProduct={selectedProduct}
          productSize={productSize}
          productUnit={productUnit}
          onProductChange={setSelectedProduct}
          onSizeChange={setProductSize}
          onUnitChange={setProductUnit}
        />

        <Box sx={styles.mainContent}>
          <Box sx={styles.sections}>
            <Accordion
              expanded={expandedSection === "labour"}
              onChange={handleAccordionChange("labour")}
              sx={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={styles.accordionSummary}
              >
                <Typography>Labour Costs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LabourCosts
                  labour={costs.labour}
                  onChange={(field, value) =>
                    handleCostChange("labour", field, value)
                  }
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedSection === "packaging"}
              onChange={handleAccordionChange("packaging")}
              sx={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={styles.accordionSummary}
              >
                <Typography>Packaging Costs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PackagingCosts
                  packaging={costs.packaging}
                  onChange={(field, value) =>
                    handleCostChange("packaging", field, value)
                  }
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedSection === "distribution"}
              onChange={handleAccordionChange("distribution")}
              sx={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={styles.accordionSummary}
              >
                <Typography>Distribution Costs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DistributionCosts
                  distribution={costs.distribution}
                  onChange={(field, value) =>
                    handleCostChange("distribution", field, value)
                  }
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedSection === "logistics"}
              onChange={handleAccordionChange("logistics")}
              sx={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={styles.accordionSummary}
              >
                <Typography>Logistics Costs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LogisticsCosts
                  logistics={costs.logistics}
                  onChange={(field, value) =>
                    handleCostChange("logistics", field, value)
                  }
                />
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Cost summary content */}
          <CostSummary costs={costs} />
        </Box>

        <Box mt={4}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={() => handleSave(false)}
          >
            Submit Costs
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CostManagement;
