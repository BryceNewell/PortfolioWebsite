import type { Metadata } from "next";
import Link from "next/link";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { PoiTrackerPage } from "@/components/PoiTrackerPage";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Open a POITracker link",
  robots: { index: false },
};

export default function SharedLinkPage() {
  const playStoreUrl = getProject("poitracker")?.app?.playStoreUrl;

  return (
    <PoiTrackerPage title="Open this link in POITracker" path="/shared-link">
      <p>
        Invitations and shared collections open in the Android app. Install POITracker or
        update it on Google Play, then tap the original link on your Android device.
      </p>
      {playStoreUrl && <GooglePlayButton href={playStoreUrl} />}
      <p>
        If you still land on this page, check that Android allows POITracker to open supported
        links under Settings, Apps, POITracker, Open by default. For more help, visit{" "}
        <Link href="/support">support</Link>.
      </p>
    </PoiTrackerPage>
  );
}
