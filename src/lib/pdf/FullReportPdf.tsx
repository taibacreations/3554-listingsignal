import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const NAVY = "#0B1E33";
const TEAL = "#1FAE9F";
const TEAL_LIGHT = "#EAF6F4";
const GRAY_BG = "#F7F9FA";
const GRAY_TEXT = "#6B7280";
const BORDER = "#E5E7EB";

const styles = StyleSheet.create({
  page: { paddingTop: 36, paddingBottom: 60, paddingHorizontal: 40, fontFamily: "Helvetica", fontSize: 10, color: NAVY },
  headerBand: {
    backgroundColor: NAVY,
    marginHorizontal: -40,
    marginTop: -36,
    paddingHorizontal: 40,
    paddingTop: 24,
    paddingBottom: 22,
    marginBottom: 20,
  },
  brandText: { fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 10 },
  title: { fontSize: 19, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 },
  address: { fontSize: 10.5, color: "#B9C4D0" },

  sectionLabel: { fontSize: 8.5, fontWeight: 700, color: GRAY_TEXT, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 },

  card: { backgroundColor: GRAY_BG, borderRadius: 10, borderWidth: 1, borderColor: BORDER, padding: 16, marginBottom: 12 },
  bigValue: { fontSize: 24, fontWeight: 700, color: NAVY },
  rangeText: { fontSize: 9, color: GRAY_TEXT, marginTop: 4 },

  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 26, fontWeight: 700, color: TEAL },
  scoreOutOf: { fontSize: 11, color: "#9CA3AF", marginLeft: 4 },
  badge: { alignSelf: "flex-start", backgroundColor: TEAL_LIGHT, color: "#178F82", fontSize: 9, fontWeight: 700, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, marginTop: 6 },

  detailsGrid: { flexDirection: "row", gap: 8 },
  detailBox: { flex: 1, backgroundColor: GRAY_BG, borderRadius: 8, borderWidth: 1, borderColor: BORDER, padding: 10 },
  detailValue: { fontSize: 15, fontWeight: 700, color: NAVY },
  detailLabel: { fontSize: 7, color: GRAY_TEXT, marginTop: 2, textTransform: "uppercase" },

  // Comps table
  tableHeader: { flexDirection: "row", backgroundColor: NAVY, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 8, marginTop: 10 },
  tableHeaderText: { fontSize: 7, fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: BORDER },
  tableRowAlt: { backgroundColor: "#FAFBFC" },
  tableCellText: { fontSize: 8, color: NAVY },
  tableCellSub: { fontSize: 7, color: GRAY_TEXT },

  colAddress: { width: "34%" },
  colDist: { width: "12%" },
  colBeds: { width: "14%" },
  colSqft: { width: "14%" },
  colPrice: { width: "16%" },
  colDate: { width: "10%" },

  neighborhoodGrid: { flexDirection: "row", gap: 10, marginTop: 12 },
  neighborhoodBox: { flex: 1, backgroundColor: TEAL_LIGHT, borderRadius: 8, padding: 12 },
  neighborhoodValue: { fontSize: 15, fontWeight: 700, color: "#0E8F82" },
  neighborhoodLabel: { fontSize: 7, color: "#178F82", marginTop: 2, textTransform: "uppercase" },

  footer: { position: "absolute", bottom: 24, left: 40, right: 40, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 10, backgroundColor: "#FFFFFF" },
  footerText: { fontSize: 7.5, color: "#9CA3AF", textAlign: "center", lineHeight: 1.5 },
});

interface ComparableRow {
  formattedAddress?: string;
  distance?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  price?: number;
  listedDate?: string;
}

export interface FullReportPdfProps {
  address: string;
  estimatedValue: string;
  rangeLow: string;
  rangeHigh: string;
  signalScore: number;
  signalLabel: string;
  bedrooms: number | string;
  bathrooms: number | string;
  squareFootage: string;
  yearBuilt: number | string;
  comparables: ComparableRow[];
  medianPrice: number | null;
  medianPricePerSqft: number | null;
  medianDaysOnMarket: number | null;
}

function fmtMoney(value?: number): string {
  if (value == null) return "-";
  return `$${Math.round(value).toLocaleString()}`;
}

export function FullReportPdf({
  address,
  estimatedValue,
  rangeLow,
  rangeHigh,
  signalScore,
  signalLabel,
  bedrooms,
  bathrooms,
  squareFootage,
  yearBuilt,
  comparables,
  medianPrice,
  medianPricePerSqft,
  medianDaysOnMarket,
}: FullReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <Text style={styles.brandText}>Listing Signal</Text>
          <Text style={styles.title}>Your Full Listing Signal Report</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Estimated Home Value</Text>
          <Text style={styles.bigValue}>{estimatedValue}</Text>
          <Text style={styles.rangeText}>Value range: {rangeLow} - {rangeHigh}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Signal to Sell</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{signalScore}</Text>
            <Text style={styles.scoreOutOf}>/ 100</Text>
          </View>
          <Text style={styles.badge}>{signalLabel}</Text>
        </View>

        <Text style={styles.sectionLabel}>Property Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>{bedrooms}</Text>
            <Text style={styles.detailLabel}>Bedrooms</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>{bathrooms}</Text>
            <Text style={styles.detailLabel}>Bathrooms</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>{squareFootage}</Text>
            <Text style={styles.detailLabel}>Sq Ft</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>{yearBuilt}</Text>
            <Text style={styles.detailLabel}>Year Built</Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 16 }]}>
          Comparable Sales ({comparables.length})
        </Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colAddress]}>Address</Text>
          <Text style={[styles.tableHeaderText, styles.colDist]}>Dist.</Text>
          <Text style={[styles.tableHeaderText, styles.colBeds]}>Bed/Bath</Text>
          <Text style={[styles.tableHeaderText, styles.colSqft]}>Sq Ft</Text>
          <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
        </View>
        {comparables.slice(0, 12).map((c, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={[styles.tableCellText, styles.colAddress]}>{c.formattedAddress ?? "-"}</Text>
            <Text style={[styles.tableCellSub, styles.colDist]}>
              {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
            </Text>
            <Text style={[styles.tableCellSub, styles.colBeds]}>
              {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
            </Text>
            <Text style={[styles.tableCellSub, styles.colSqft]}>
              {c.squareFootage ? c.squareFootage.toLocaleString() : "-"}
            </Text>
            <Text style={[styles.tableCellText, styles.colPrice]}>{fmtMoney(c.price)}</Text>
          </View>
        ))}

        <View style={{ marginTop: 20 }} break>
          <Text style={styles.sectionLabel}>Neighborhood Market Summary</Text>
        </View>
        <View style={styles.neighborhoodGrid}>
          <View style={styles.neighborhoodBox}>
            <Text style={styles.neighborhoodValue}>{fmtMoney(medianPrice ?? undefined)}</Text>
            <Text style={styles.neighborhoodLabel}>Median Sale Price</Text>
          </View>
          <View style={styles.neighborhoodBox}>
            <Text style={styles.neighborhoodValue}>
              {medianPricePerSqft ? `$${Math.round(medianPricePerSqft)}` : "-"}
            </Text>
            <Text style={styles.neighborhoodLabel}>Median $/SqFt</Text>
          </View>
          <View style={styles.neighborhoodBox}>
            <Text style={styles.neighborhoodValue}>
              {medianDaysOnMarket != null ? `${medianDaysOnMarket} days` : "-"}
            </Text>
            <Text style={styles.neighborhoodLabel}>Median Days on Market</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not a formal appraisal.{"\n"}
            © {new Date().getFullYear()} Listing Signal
          </Text>
        </View>
      </Page>
    </Document>
  );
}