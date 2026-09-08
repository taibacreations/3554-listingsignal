import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import path from "path";

const NAVY = "#0B1E33";
const TEAL = "#1FAE9F";
const TEAL_LIGHT = "#EAF6F4";
const GRAY_BG = "#F7F9FA";
const GRAY_TEXT = "#6B7280";
const BORDER = "#E5E7EB";
const ORANGE = "#D97706";
const ORANGE_LIGHT = "#FEF3E2";
const GREEN = "#178F82";
const BLUE = "#1D4ED8";
const BLUE_LIGHT = "#EAF2FE";

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
    paddingTop: 26,
    paddingBottom: 20,
    marginBottom: 18,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  logoImage: {
    height: 24,
    objectFit: "contain",
  },
  title: { fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 },
  address: { fontSize: 10, color: "#B9C4D0" },

  sectionLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: GRAY_TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 7,
  },

  card: {
    backgroundColor: GRAY_BG,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bigValue: { fontSize: 21, fontWeight: 700, color: NAVY },
  rangeText: { fontSize: 8.5, color: GRAY_TEXT, marginTop: 3 },
  rangeStrong: { color: NAVY, fontWeight: 700 },
  confidenceBadge: {
    alignSelf: "flex-start",
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 8,
    fontWeight: 700,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 9,
    marginTop: 7,
  },
  trendBadge: {
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 7.5,
    fontWeight: 700,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 22, fontWeight: 700, color: TEAL },
  scoreOutOf: { fontSize: 10, color: "#9CA3AF", marginLeft: 4 },
  tierBadge: {
    alignSelf: "flex-start",
    fontSize: 8,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9,
    marginTop: 7,
  },

  detailsGrid: { flexDirection: "row", gap: 7 },
  detailBox: {
    flex: 1,
    backgroundColor: GRAY_BG,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 8,
  },
  detailValue: { fontSize: 13, fontWeight: 700, color: NAVY },
  detailLabel: {
    fontSize: 6.5,
    color: GRAY_TEXT,
    marginTop: 2,
    textTransform: "uppercase",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: NAVY,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  tableHeaderText: {
    fontSize: 6.5,
    fontWeight: 700,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6.5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowAlt: { backgroundColor: "#FAFBFC" },
  tableCellText: { fontSize: 7.3, color: NAVY, lineHeight: 1.3 },
  tableCellSub: { fontSize: 6.8, color: GRAY_TEXT, lineHeight: 1.3 },

  colAddress: { width: "34%", paddingRight: 6 },
  colDist: { width: "11%" },
  colBeds: { width: "13%" },
  colSqft: { width: "12%" },
  colPrice: { width: "15%" },
  colDate: { width: "15%" },

  neighborhoodGrid: { flexDirection: "row", gap: 8, marginTop: 10 },
  neighborhoodBox: {
    flex: 1,
    backgroundColor: TEAL_LIGHT,
    borderRadius: 7,
    padding: 10,
  },
  neighborhoodValue: { fontSize: 13, fontWeight: 700, color: GREEN },
  neighborhoodLabel: {
    fontSize: 6.5,
    color: GREEN,
    marginTop: 2,
    textTransform: "uppercase",
  },

  legendRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  legendItem: { flex: 1 },
  legendHeader: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  legendDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  legendTitle: { fontSize: 7.5, fontWeight: 700, color: NAVY },
  legendDesc: { fontSize: 6.8, color: GRAY_TEXT, lineHeight: 1.3 },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 7,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 1.4,
  },
});

const LOGO_PATH = path.join(process.cwd(), "public", "logo.png");

function tierColors(label: string): { bg: string; text: string } {
  if (label === "Strong Signal") return { bg: TEAL_LIGHT, text: GREEN };
  if (label === "Steady Signal") return { bg: BLUE_LIGHT, text: BLUE };
  return { bg: ORANGE_LIGHT, text: ORANGE };
}

interface ComparableRow {
  formattedAddress?: string;
  distance?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  price?: number;
  listedDate?: string;
  removedDate?: string | null;
  lastSeenDate?: string;
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

function compDate(comp: ComparableRow): Date | null {
  const dateStr = comp.removedDate ?? comp.lastSeenDate ?? comp.listedDate;
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtSaleDate(comp: ComparableRow): string {
  const d = compDate(comp);
  if (!d) return "-";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Show only the most recent sales, capped at 8, so the whole report
// (comps + neighborhood summary) fits comfortably on a single page like
// the client's reference PDF — no multi-page pagination needed.
const MAX_COMPS = 8;

function mostRecentComps(comparables: ComparableRow[]): ComparableRow[] {
  return [...comparables]
    .sort((a, b) => {
      const da = compDate(a);
      const db = compDate(b);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db.getTime() - da.getTime();
    })
    .slice(0, MAX_COMPS);
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
  const recentComps = mostRecentComps(comparables);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <Image src={LOGO_PATH} style={styles.logoImage} />
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
            <Text
              style={[
                styles.tierBadge,
                { backgroundColor: tierStyle.bg, color: tierStyle.text },
              ]}
            >
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

          {recentComps.length > 0 && (
            <>
              <Text style={[styles.sectionLabel, { marginTop: 14 }]}>
                Comparable Sales (Most Recent {recentComps.length})
              </Text>
              <View style={styles.tableHeader}>
                <View style={styles.colAddress}>
                  <Text style={styles.tableHeaderText}>Address</Text>
                </View>
                <View style={styles.colDist}>
                  <Text style={styles.tableHeaderText}>Dist.</Text>
                </View>
                <View style={styles.colBeds}>
                  <Text style={styles.tableHeaderText}>Bed/Bath</Text>
                </View>
                <View style={styles.colSqft}>
                  <Text style={styles.tableHeaderText}>Sq Ft</Text>
                </View>
                <View style={styles.colPrice}>
                  <Text style={styles.tableHeaderText}>Price</Text>
                </View>
                <View style={styles.colDate}>
                  <Text style={styles.tableHeaderText}>Sale Date</Text>
                </View>
              </View>
              {recentComps.map((c, i) => (
                <View
                  key={i}
                  wrap={false}
                  style={[
                    styles.tableRow,
                    i % 2 === 1 ? styles.tableRowAlt : {},
                  ]}
                >
                  <View style={styles.colAddress}>
                    <Text style={styles.tableCellText}>
                      {c.formattedAddress ?? "-"}
                    </Text>
                  </View>
                  <View style={styles.colDist}>
                    <Text style={styles.tableCellSub}>
                      {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
                    </Text>
                  </View>
                  <View style={styles.colBeds}>
                    <Text style={styles.tableCellSub}>
                      {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
                    </Text>
                  </View>
                  <View style={styles.colSqft}>
                    <Text style={styles.tableCellSub}>
                      {c.squareFootage != null
                        ? c.squareFootage.toLocaleString()
                        : "-"}
                    </Text>
                  </View>
                  <View style={styles.colPrice}>
                    <Text style={styles.tableCellText}>
                      {fmtMoney(c.price)}
                    </Text>
                  </View>
                  <View style={styles.colDate}>
                    <Text style={styles.tableCellSub}>{fmtSaleDate(c)}</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          <Text style={[styles.sectionLabel, { marginTop: 14 }]}>
            Neighborhood Market Summary
          </Text>
          <View style={styles.neighborhoodGrid}>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {fmtMoney(medianPrice)}
              </Text>
              <Text style={styles.neighborhoodLabel}>Median Sale Price</Text>
            </View>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {medianPricePerSqft
                  ? `$${Math.round(medianPricePerSqft)}`
                  : "-"}
              </Text>
              <Text style={styles.neighborhoodLabel}>Median $/SqFt</Text>
            </View>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {medianDaysOnMarket != null
                  ? `${medianDaysOnMarket} days`
                  : "-"}
              </Text>
              <Text style={styles.neighborhoodLabel}>
                Median Days on Market
              </Text>
            </View>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={styles.legendHeader}>
                <View style={[styles.legendDot, { backgroundColor: TEAL }]} />
                <Text style={styles.legendTitle}>80-100 — Strong Signal</Text>
              </View>
              <Text style={styles.legendDesc}>The market is on your side.</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendHeader}>
                <View style={[styles.legendDot, { backgroundColor: BLUE }]} />
                <Text style={styles.legendTitle}>60-79 — Steady Signal</Text>
              </View>
              <Text style={styles.legendDesc}>
                A balanced market with smart opportunities.
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendHeader}>
                <View style={[styles.legendDot, { backgroundColor: ORANGE }]} />
                <Text style={styles.legendTitle}>0-59 — Opportunity Signal</Text>
              </View>
              <Text style={styles.legendDesc}>
                Strong potential forming in your area.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not
            a formal appraisal.{"\n"}© {new Date().getFullYear()} Listing
            Signal™
          </Text>
        </View>
      </Page>
    </Document>
  );
}