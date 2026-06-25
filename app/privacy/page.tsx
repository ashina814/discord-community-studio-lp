import { LegalDocument } from "@/components/legal-document";
import { privacyText } from "@/content/legal";

export default function PrivacyPage() {
  return <LegalDocument title="プライバシーポリシー" body={privacyText} />;
}
