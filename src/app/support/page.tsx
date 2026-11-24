import type { Metadata } from "next";
import Link from "next/link";
import { PoiTrackerPage } from "@/components/PoiTrackerPage";

export const metadata: Metadata = {
  title: "POITracker Support",
  description: "Get help with the POITracker Android app.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <PoiTrackerPage title="App support" path="/support">
      <p>
        Check the <Link href="/faq">FAQ</Link> for help with offline use, sync and subscriptions.
      </p>
      <h2>Contact support</h2>
      <p>
        Email <a href="mailto:holidaypoitracker@gmail.com">holidaypoitracker@gmail.com</a> for
        help with the app or an account deletion request.
      </p>
      <p>
        For a bug report, include your app version, phone model, Android version and the steps
        that led to the issue. Keep passwords and payment details out of your message.
      </p>
      <h2>Billing and cancellation</h2>
      <p>
        Manage subscriptions through{" "}
        <a href="https://play.google.com/store/account/subscriptions">Google Play subscriptions</a>.
        For help with cancellation, see{" "}
        <a href="https://support.google.com/googleplay/answer/7018481">Google Play Help</a>.
      </p>
    </PoiTrackerPage>
  );
}
