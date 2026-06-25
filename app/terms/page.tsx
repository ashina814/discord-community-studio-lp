import { LegalDocument } from "@/components/legal-document";
import { termsText } from "@/content/legal";

export default function TermsPage() {
  return <LegalDocument title="利用規約" body={termsText} />;
}
