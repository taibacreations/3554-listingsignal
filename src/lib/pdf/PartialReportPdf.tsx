import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Link,
} from "@react-pdf/renderer";

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
    backgroundColor: "#FFFFFF",
  },
  content: { paddingHorizontal: 40 },

  // Header band
  headerBand: {
    backgroundColor: NAVY,
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 24,
    marginBottom: 24,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  logoMark: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: TEAL,
    marginRight: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontSize: 14, fontWeight: 700, color: "#FFFFFF" },
  brandTM: { fontSize: 8, color: "#FFFFFF", marginLeft: 2 },

  title: { fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 5 },
  address: { fontSize: 11, color: "#B9C4D0" },

  sectionLabel: {
    fontSize: 8.5,
    fontWeight: 700,
    color: GRAY_TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },

  card: {
    backgroundColor: GRAY_BG,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    marginBottom: 14,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  bigValue: { fontSize: 30, fontWeight: 700, color: NAVY, marginTop: 2 },
  rangeText: { fontSize: 9.5, color: GRAY_TEXT, marginTop: 6 },
  rangeStrong: { color: NAVY, fontWeight: 700 },

  confidenceBadge: {
    alignSelf: "flex-start",
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 9,
    fontWeight: 700,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 11,
    marginTop: 10,
  },

  trendBadge: {
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 8.5,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 10,
  },

  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 36, fontWeight: 700, color: TEAL },
  scoreOutOf: { fontSize: 14, color: "#9CA3AF", marginLeft: 5 },
  scoreBarTrack: {
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E7EAEE",
    marginTop: 12,
    marginBottom: 9,
    overflow: "hidden",
  },
  scoreBarFill: { height: 7, borderRadius: 3.5, backgroundColor: TEAL },
  scoreLegendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  scoreLegendItem: { flexDirection: "row", alignItems: "center" },
  scoreLegendDot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  scoreLegendText: { fontSize: 7.5, color: "#9CA3AF" },
  tierBadge: {
    alignSelf: "flex-start",
    fontSize: 10,
    fontWeight: 700,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 12,
    marginTop: 12,
  },
  tierMessage: { fontSize: 9, color: GRAY_TEXT, marginTop: 8, lineHeight: 1.5 },

  detailsGrid: { flexDirection: "row", gap: 10 },
  detailBox: {
    flex: 1,
    backgroundColor: GRAY_BG,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
  },
  detailValue: { fontSize: 17, fontWeight: 700, color: NAVY },
  detailLabel: {
    fontSize: 7.5,
    color: GRAY_TEXT,
    marginTop: 3,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  estimatedNote: {
    fontSize: 8,
    color: ORANGE,
    marginTop: 10,
    fontStyle: "italic",
  },

  ctaBox: {
    marginTop: 22,
    backgroundColor: NAVY,
    borderRadius: 12,
    padding: 22,
    alignItems: "center",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 5,
  },
  ctaSub: { color: "#9CA3AF", fontSize: 9, textAlign: "center" },
  ctaPill: {
    marginTop: 12,
    backgroundColor: TEAL,
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: 700,
    paddingVertical: 9,
    paddingHorizontal: 22,
    borderRadius: 22,
    textDecoration: "none",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  ctaPillIcon: {
    marginRight: 7,
  },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 7.5,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 1.5,
  },
});

function tierColors(label: string): { bg: string; text: string } {
  if (label === "Strong Signal") return { bg: TEAL_LIGHT, text: GREEN };
  if (label === "Steady Signal") return { bg: "#EAF2FE", text: "#1D4ED8" };
  return { bg: ORANGE_LIGHT, text: ORANGE };
}

export interface PartialReportPdfProps {
  address: string;
  estimatedValue: string;
  rangeLow: string;
  rangeHigh: string;
  confidenceLabel: string;
  signalScore: number;
  signalLabel: string;
  signalMessage: string;
  bedrooms: number | string;
  bathrooms: number | string;
  squareFootage: string;
  yearBuilt: number | string;
  detailsEstimated: boolean;
  bookingUrl?: string;
}

export function PartialReportPdf({
  address,
  estimatedValue,
  rangeLow,
  rangeHigh,
  confidenceLabel,
  signalScore,
  signalLabel,
  signalMessage,
  bedrooms,
  bathrooms,
  squareFootage,
  yearBuilt,
  detailsEstimated,
  bookingUrl,
}: PartialReportPdfProps) {
  const scoreFillPct = Math.min(Math.max(signalScore, 0), 100);
  const tierStyle = tierColors(signalLabel);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <View style={styles.logoMark}>
              <Svg width="13" height="13" viewBox="0 0 24 24">
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
          <Text style={styles.title}>Your Listing Signal™ Report</Text>
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
              Value range:{" "}
              <Text style={styles.rangeStrong}>
                {rangeLow} - {rangeHigh}
              </Text>
            </Text>
            <Text style={styles.confidenceBadge}>
              Confidence: {confidenceLabel}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Signal to Sell™</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{signalScore}</Text>
              <Text style={styles.scoreOutOf}>/ 100</Text>
            </View>
            <View style={styles.scoreBarTrack}>
              <View
                style={[styles.scoreBarFill, { width: `${scoreFillPct}%` }]}
              />
            </View>
            <View style={styles.scoreLegendRow}>
              <View style={styles.scoreLegendItem}>
                <View
                  style={[styles.scoreLegendDot, { backgroundColor: ORANGE }]}
                />
                <Text style={styles.scoreLegendText}>Opportunity 0-59</Text>
              </View>
              <View style={styles.scoreLegendItem}>
                <View
                  style={[
                    styles.scoreLegendDot,
                    { backgroundColor: "#1D4ED8" },
                  ]}
                />
                <Text style={styles.scoreLegendText}>Steady 60-79</Text>
              </View>
              <View style={styles.scoreLegendItem}>
                <View
                  style={[styles.scoreLegendDot, { backgroundColor: TEAL }]}
                />
                <Text style={styles.scoreLegendText}>Strong 80-100</Text>
              </View>
            </View>
            <Text
              style={[
                styles.tierBadge,
                { backgroundColor: tierStyle.bg, color: tierStyle.text },
              ]}
            >
              {signalLabel}
            </Text>
            <Text style={styles.tierMessage}>{signalMessage}</Text>
          </View>

          <Text style={styles.sectionLabel}>
            Property Details
            {detailsEstimated ? " (Estimated from nearby homes)" : ""}
          </Text>
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
              <Text style={styles.detailLabel}>Square Footage</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{yearBuilt}</Text>
              <Text style={styles.detailLabel}>Year Built</Text>
            </View>
          </View>
          {detailsEstimated && (
            <Text style={styles.estimatedNote}>
              Public records were unavailable for this address — details
              estimated from the nearest comparable home.
            </Text>
          )}

          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>
              Book your free home visit to unlock your full report
            </Text>
            <Text style={styles.ctaSub}>
              Comparable sales, neighborhood pricing trends, and more
            </Text>
            {bookingUrl ? (
              <Link src={bookingUrl} style={styles.ctaPill}>
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  style={styles.ctaPillIcon}
                >
                  <Path
                    d="M7 2v3M17 2v3M3.5 8.5h17M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text>Book Your Free Home Walkthrough</Text>
              </Link>
            ) : (
              <View style={styles.ctaPill}>
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  style={styles.ctaPillIcon}
                >
                  <Path
                    d="M7 2v3M17 2v3M3.5 8.5h17M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text>Book Your Free Home Walkthrough</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not
            a formal appraisal.{"\n"}
            Values are based on available market data and may vary. ©{" "}
            {new Date().getFullYear()} Listing Signal™
          </Text>
        </View>
      </Page>
    </Document>
  );
}
