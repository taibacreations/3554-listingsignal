import { renderToBuffer } from "@react-pdf/renderer";
import { PartialReportPdf, type PartialReportPdfProps } from "./PartialReportPdf";
import { FullReportPdf, type FullReportPdfProps } from "./FullReportPdf";

export async function generatePartialReportPdf(props: PartialReportPdfProps): Promise<Buffer> {
  return renderToBuffer(<PartialReportPdf {...props} />);
}

export async function generateFullReportPdf(props: FullReportPdfProps): Promise<Buffer> {
  return renderToBuffer(<FullReportPdf {...props} />);
}