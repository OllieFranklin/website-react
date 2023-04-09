type FeatureFlags = {
  enableTestUI?: boolean;
};

const jsonString = process.env.REACT_APP_FEATURE_FLAGS;
const featureFlags = JSON.parse(jsonString ?? '{}') as FeatureFlags;

export { featureFlags };
