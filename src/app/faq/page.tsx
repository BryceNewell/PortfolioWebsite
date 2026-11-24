import type { Metadata } from "next";
import Link from "next/link";
import { PoiTrackerPage } from "@/components/PoiTrackerPage";

export const metadata: Metadata = {
  title: "POITracker FAQ",
  description: "Answers about offline use, cloud sync and subscriptions in POITracker.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <PoiTrackerPage title="Frequently asked questions" path="/faq">
      <h2>Can I save places offline?</h2>
      <p>
        Yes. You can save and organise places on your device without an internet connection.
        Online features such as Street View and cloud sync require a connection.
      </p>
      <h2>What does cloud sync copy?</h2>
      <p>
        Cloud sync is optional. It syncs place information while the app is open. Photos stay on
        your device.
      </p>
      <h2>How do I manage a subscription?</h2>
      <p>
        Open <a href="https://play.google.com/store/account/subscriptions">Google Play subscriptions</a>{" "}
        with the Google account you used to purchase it. If you uninstall POITracker, your
        subscription will continue until you cancel it through Google Play.
      </p>
      <h2>How do I delete my account?</h2>
      <p>
        Use the account deletion option in the app. If you cannot access it, use the{" "}
        <Link href="/support">support page</Link> to get in touch.
      </p>
    </PoiTrackerPage>
  );
}
