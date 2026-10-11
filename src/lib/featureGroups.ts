import { FEATURE_GROUPS, FEATURES } from "@/src/constant/marketing";
import type { FeatureGroup } from "@/src/types/types";

/** FEATURE_GROUPS with each title resolved to its full feature (unknown titles are skipped). */
export function getFeatureGroups(): FeatureGroup[] {
  return FEATURE_GROUPS.map((group) => ({
    ...group,
    features: group.features.flatMap((title) => FEATURES.filter((feature) => feature.title === title)),
  }));
}
