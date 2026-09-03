import { Document, Page, Text, View, StyleSheet, Svg, Path } from "@react-pdf/renderer";

const NAVY = "#0B1E33";
const TEAL = "#1FAE9F";
const TEAL_LIGHT = "#EAF6F4";
const GRAY_BG = "#F7F9FA";
const GRAY_TEXT = "#6B7280";
const BORDER = "#E5E7EB";
const ORANGE = "#D97706";
const ORANGE_LIGHT = "#FEF3E2";
const GREEN = "#178F82";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 56,
    paddingHorizontal: 0,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: NAVY,
  },
  content: { paddingHorizontal: 40 },

  headerBand: {
    backgroundColor: NAVY,
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 24,
    marginBottom: 22,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  logoMark: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: TEAL,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontSize: 13, fontWeight: 700, color: "#FFFFFF" },
  brandTM: { fontSize: 7, color: "#FFFFFF", marginLeft: 2 },
  title: { fontSize: 19, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 },
  address: { fontSize: 10.5, color: "#B9C4D0" },

  sectionLabel: { fontSize: 8.5, fontWeight: 700, color: GRAY_TEXT, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 },

  card: { backgroundColor: GRAY_BG, borderRadius: 10, borderWidth: 1, borderColor: BORDER, padding: 16, marginBottom: 12 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  bigValue: { fontSize: 24, fontWeight: 700, color: NAVY },
  rangeText: { fontSize: 9, color: GRAY_TEXT, marginTop: 4 },
  rangeStrong: { color: NAVY, fontWeight: 700 },
  confidenceBadge: {
    alignSelf: "flex-start",
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 8.5,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  trendBadge: { backgroundColor: TEAL_LIGHT, color: GREEN, fontSize: 8, fontWeight: 700, paddingVertical: 4, paddingHorizontal: 9, borderRadius: 9 },

  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 26, fontWeight: 700, color: TEAL },
  scoreOutOf: { fontSize: 11, color: "#9CA3AF", marginLeft: 4 },
  tierBadge: { alignSelf: "flex-start", fontSize: 9, fontWeight: 700, paddingVertical: 5, paddingHorizontal: 11, borderRadius: 10, marginTop: 8 },

  detailsGrid: { flexDirection: "row", gap: 8 },
  detailBox: { flex: 1, backgroundColor: GRAY_BG, borderRadius: 8, borderWidth: 1, borderColor: BORDER, padding: 10 },
  detailValue: { fontSize: 15, fontWeight: 700, color: NAVY },
  detailLabel: { fontSize: 7, color: GRAY_TEXT, marginTop: 2, textTransform: "uppercase" },

  tableHeader: { flexDirection: "row", backgroundColor: NAVY, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 9, marginTop: 10 },
  tableHeaderText: { fontSize: 7.5, fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", paddingVertical: 7, paddingHorizontal: 9, borderBottomWidth: 1, borderBottomColor: BORDER },
  tableRowAlt: { backgroundColor: "#FAFBFC" },
  tableCellText: { fontSize: 8.5, color: NAVY },
  tableCellSub: { fontSize: 7.5, color: GRAY_TEXT },

  colAddress: { width: "36%" },
  colDist: { width: "13%" },
  colBeds: { width: "15%" },
  colSqft: { width: "16%" },
  colPrice: { width: "20%" },

  neighborhoodGrid: { flexDirection: "row", gap: 10, marginTop: 10 },
  neighborhoodBox: { flex: 1, backgroundColor: TEAL_LIGHT, borderRadius: 8, padding: 12 },
  neighborhoodValue: { fontSize: 15, fontWeight: 700, color: GREEN },
  neighborhoodLabel: { fontSize: 7, color: GREEN, marginTop: 2, textTransform: "uppercase" },

  footer: { position: "absolute", bottom: 22, left: 40, right: 40, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 10, backgroundColor: "#FFFFFF" },
  footerText: { fontSize: 7.5, color: "#9CA3AF", textAlign: "center", lineHeight: 1.5 },
});

function tierColors(label: string): { bg: string; text: string } {
  if (label === "Strong Signal") return { bg: TEAL_LIGHT, text: GREEN };
  if (label === "Steady Signal") return { bg: "#EAF2FE", text: "#1D4ED8" };
  return { bg: ORANGE_LIGHT, text: ORANGE };
}

interface ComparableRow {
  formattedAddress?: string;
  distance?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  price?: number;
}

export interface FullReportPdfProps {
  address: string;
  estimatedValue: string;
  rangeLow: string;
  rangeHigh: string;
  confidenceLabel: string;
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

function fmtMoney(value?: number | null): string {
  if (value == null) return "-";
  return `$${Math.round(value).toLocaleString()}`;
}

// Comps are split into pages of this size so the table never collides with
// the fixed footer — each chunk gets its own page instead of one long table
// that can overflow past the footer and leave a blank trailing page.
const COMPS_PER_PAGE = 9;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function FullReportPdf({
  address,
  estimatedValue,
  rangeLow,
  rangeHigh,
  confidenceLabel,
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
  const tierStyle = tierColors(signalLabel);
  const compPages = chunk(comparables.slice(0, 27), COMPS_PER_PAGE);

  return (
    <Document>
      {/* Page 1 — summary + property details + first batch of comps */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <View style={styles.logoMark}>
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <Path
                  d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </Svg>
            </View>
            <Text style={styles.brandText}>Listing Signal</Text>
            <Text style={styles.brandTM}>™</Text>
          </View>
          <Text style={styles.title}>Your Full Listing Signal™ Report</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.sectionLabel}>Estimated Home Value</Text>
              <Text style={styles.trendBadge}>Today's Market</Text>
            </View>
            <Text style={styles.bigValue}>{estimatedValue}</Text>
            <Text style={styles.rangeText}>
              Value range: <Text style={styles.rangeStrong}>{rangeLow} - {rangeHigh}</Text>
            </Text>
            <Text style={styles.confidenceBadge}>Confidence: {confidenceLabel}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Signal to Sell™</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{signalScore}</Text>
              <Text style={styles.scoreOutOf}>/ 100</Text>
            </View>
            <Text style={[styles.tierBadge, { backgroundColor: tierStyle.bg, color: tierStyle.text }]}>
              {signalLabel}
            </Text>
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

          {compPages[0] && compPages[0].length > 0 && (
            <>
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
              {compPages[0].map((c, i) => (
                <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                  <Text style={[styles.tableCellText, styles.colAddress]}>{c.formattedAddress ?? "-"}</Text>
                  <Text style={[styles.tableCellSub, styles.colDist]}>
                    {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
                  </Text>
                  <Text style={[styles.tableCellSub, styles.colBeds]}>
                    {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
                  </Text>
                  <Text style={[styles.tableCellSub, styles.colSqft]}>
                    {c.squareFootage != null ? c.squareFootage.toLocaleString() : "-"}
                  </Text>
                  <Text style={[styles.tableCellText, styles.colPrice]}>{fmtMoney(c.price)}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not a formal appraisal.{"\n"}
            © {new Date().getFullYear()} Listing Signal™
          </Text>
        </View>
      </Page>

      {/* Additional comp pages, only rendered if there are more comps than fit on page 1 */}
      {compPages.slice(1).map((pageComps, pageIdx) => (
        <Page key={pageIdx} size="A4" style={styles.page}>
          <View style={styles.headerBand}>
            <View style={styles.headerTop}>
              <View style={styles.logoMark}>
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  />
                </Svg>
              </View>
              <Text style={styles.brandText}>Listing Signal</Text>
              <Text style={styles.brandTM}>™</Text>
            </View>
            <Text style={styles.title}>Comparable Sales (continued)</Text>
            <Text style={styles.address}>{address}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colAddress]}>Address</Text>
              <Text style={[styles.tableHeaderText, styles.colDist]}>Dist.</Text>
              <Text style={[styles.tableHeaderText, styles.colBeds]}>Bed/Bath</Text>
              <Text style={[styles.tableHeaderText, styles.colSqft]}>Sq Ft</Text>
              <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
            </View>
            {pageComps.map((c, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                <Text style={[styles.tableCellText, styles.colAddress]}>{c.formattedAddress ?? "-"}</Text>
                <Text style={[styles.tableCellSub, styles.colDist]}>
                  {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
                </Text>
                <Text style={[styles.tableCellSub, styles.colBeds]}>
                  {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
                </Text>
                <Text style={[styles.tableCellSub, styles.colSqft]}>
                  {c.squareFootage != null ? c.squareFootage.toLocaleString() : "-"}
                </Text>
                <Text style={[styles.tableCellText, styles.colPrice]}>{fmtMoney(c.price)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
              This automated report is for informational purposes only and is not a formal appraisal.{"\n"}
              © {new Date().getFullYear()} Listing Signal™
            </Text>
          </View>
        </Page>
      ))}

      {/* Final page — neighborhood summary, always starts fresh so it never
          collides with the comps table or the fixed footer. */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <View style={styles.logoMark}>
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <Path
                  d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </Svg>
            </View>
            <Text style={styles.brandText}>Listing Signal</Text>
            <Text style={styles.brandTM}>™</Text>
          </View>
          <Text style={styles.title}>Neighborhood Market Summary</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.neighborhoodGrid}>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>{fmtMoney(medianPrice)}</Text>
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
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not a formal appraisal.{"\n"}
            © {new Date().getFullYear()} Listing Signal™
          </Text>
        </View>
      </Page>
    </Document>
  );
}