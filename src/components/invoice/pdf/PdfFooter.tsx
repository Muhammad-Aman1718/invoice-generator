import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/src/lib/pdfStyles";
import { SITE_CONFIG } from "@/src/constant/site";
import type { PdfFooterProps } from "@/src/types/types";

export default function PdfFooter({ invoice, branding }: PdfFooterProps) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerLeft}>
        {branding ? `Made with ${SITE_CONFIG.name}` : "Thank you for your business!"}
      </Text>
      <View style={s.footerRight}>
        <View style={s.footerDot} />
        <Text
          style={s.footerText}
          render={({ pageNumber, totalPages }) =>
            `Invoice #${invoice.invoiceNumber} · Page ${pageNumber}/${totalPages}`
          }
        />
      </View>
    </View>
  );
}
