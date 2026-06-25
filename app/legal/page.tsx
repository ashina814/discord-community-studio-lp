import { LegalDocument } from "@/components/legal-document";
import { commerceText } from "@/content/legal";

export default function LegalPage() {
  return <LegalDocument title="特定商取引法に基づく表記" body={commerceText} />;
}
