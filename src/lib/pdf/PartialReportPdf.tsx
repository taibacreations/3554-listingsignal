import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11, color: "#0B1E33" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  logo: { fontSize: 18, fontWeight: 700, color: "#0B1E33" },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  address: { fontSize: 12, color: "#4B5563", marginBottom: 20 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#E5E7EB", marginVertical: 16 },
  card: { backgroundColor: "#F7F9FA", borderRadius: 8, padding: 16, marginBottom: 14 },
  label: { fontSize: 9, textTransform: "uppercase", color: "#6B7280", marginBottom: 4, letterSpacing: 0.5 },
  bigValue: { fontSize: 26, fontWeight: 700, color: "#0B1E33" },
  rangeText: { fontSize: 10, color: "#6B7280", marginTop: 4 },
  scoreRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  scoreValue: { fontSize: 26, fontWeight: 700, color: "#1FAE9F" },
  scoreOutOf: { fontSize: 12, color: "#9CA3AF" },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#EAF6F4",
    color: "#178F82",
    fontSize: 10,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 6,
  },
  detailsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  detailBox: { width: "23%", backgroundColor: "#F7F9FA", borderRadius: 8, padding: 10 },
  detailValue: { fontSize: 16, fontWeight: 700 },
  detailLabel: { fontSize: 8, color: "#6B7280", marginTop: 2, textTransform: "uppercase" },
  ctaBox: {
    marginTop: 24,
    backgroundColor: "#0B1E33",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  ctaText: { color: "#FFFFFF", fontSize: 13, fontWeight: 700, textAlign: "center", marginBottom: 4 },
  ctaSub: { color: "#9CA3AF", fontSize: 9, textAlign: "center" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 8, color: "#9CA3AF", textAlign: "center" },
});

export interface PartialReportPdfProps {
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
  detailsEstimated: boolean;
}

export function PartialReportPdf({
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
  detailsEstimated,
}: PartialReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.logo}>Listing Signal</Text>
        </View>

        <Text style={styles.title}>Your Listing Signal Report</Text>
        <Text style={styles.address}>{address}</Text>

        <View style={styles.divider} />

        <View style={styles.card}>
          <Text style={styles.label}>Estimated Home Value</Text>
          <Text style={styles.bigValue}>{estimatedValue}</Text>
          <Text style={styles.rangeText}>
            Value range: {rangeLow} - {rangeHigh}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Signal to Sell</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{signalScore}</Text>
            <Text style={styles.scoreOutOf}>/100</Text>
          </View>
          <Text style={styles.badge}>{signalLabel}</Text>
        </View>

        <Text style={styles.label}>Property Details {detailsEstimated ? "(Estimated)" : ""}</Text>
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

        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>Book your free home visit to unlock your full report</Text>
          <Text style={styles.ctaSub}>Comparable sales, neighborhood pricing trends, and more</Text>
        </View>

        <Text style={styles.footer}>
          This automated report is for informational purposes only and not a formal appraisal.{"\n"}
          © {new Date().getFullYear()} Listing Signal
        </Text>
      </Page>
    </Document>
  );
}