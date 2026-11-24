import type { Metadata } from "next";
import Link from "next/link";
import { PoiTrackerPage } from "@/components/PoiTrackerPage";

export const metadata: Metadata = {
  title: "POITracker Terms of Use",
  description: "Terms of use for the POITracker Android app.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <PoiTrackerPage title="Terms of use" path="/terms">
      <p>Draft for review.</p>
      <p>These terms cover use of the POITracker Android app provided by Bryce Newell.</p>
      <h2>Using and sharing content</h2>
      <p>
        Use the app lawfully and only upload or share content you have permission to use.
        Check who can access a collection before sharing private information or locations.
      </p>
      <h2>Purchases and subscriptions</h2>
      <p>
        Google Play processes purchases. Review the price and any renewal details shown
        before you confirm a purchase. You can manage or cancel a recurring subscription in{" "}
        <a href="https://play.google.com/store/account/subscriptions">Google Play subscriptions</a>.
      </p>
      <h2>Privacy and help</h2>
      <p>
        See the <Link href="/privacy">privacy policy</Link> for information about personal data
        and visit <Link href="/support">support</Link> for help with the app.
      </p>
    </PoiTrackerPage>
  );
}
